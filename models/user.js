import bcrypt from 'bcrypt'
import uuid from 'uuid/v1'
import DynamoDB from 'aws-sdk/clients/dynamodb'
import config from '../config'

const ddb = new DynamoDB(config.awsDDBCfg)
const tableName = `${process.env.APP_NAME}-users`

class User {
  constructor(user) {
    this.email = user.email
    this.password = user.password
    this.id = user.id
    this.role = user.role ? user.role : 'user'
  }

  static _save(email, hash, id, role) {
    let params = {
      Item: {
        id: { S: id ? id : uuid() },
        email: { S: email },
        password: { S: hash },
        role: { S: role }
      },
      TableName: tableName
    }
    return new Promise((resolve, reject) => {
      ddb.putItem(params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  save() {
    return new Promise((resolve, reject) => {
      User.hashPassword(this.password)
        .then(hash => {
          return User._save(this.email, hash, this.id, this.role)
        })
        .then(ddb_result => resolve(ddb_result))
        .catch(err => reject(err))
    })
  }

  static hashPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) reject(err)
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) reject(err)
          resolve(hash)
        })
      })
    })
  }

  static findByEmail(email) {
    let params = {
      Key: {
        email: { S: email }
      },
      TableName: tableName
    }
    return new Promise((resolve, reject) => {
      ddb.getItem(params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          if (data.Item) {
            resolve(
              new User({
                email: data.Item.email.S,
                password: data.Item.password.S,
                role: data.Item.role ? data.Item.role.S : 'user',
                id: data.Item.id.S
              })
            )
          } else {
            reject(new Error(`${email} not found`))
          }
        }
      })
    })
  }

  static allUsers(first, after) {
    /*var params = {
      ExpressionAttributeNames: {
       "AT": "AlbumTitle", 
       "ST": "SongTitle"
      }, 
      ExpressionAttributeValues: {
       ":a": {
         S: "No One You Know"
        }
      }, 
      FilterExpression: "Artist = :a", 
      ProjectionExpression: "#ST, #AT", 
      TableName: "Music"
    };*/
    let params = {
      RequestItems: {
        TableName: tableName
      }
    }
    return new Promise((resolve, reject) => {
      // params.ExclusiveStartKey = data.LastEvaluatedKey;
      ddb.scan(params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data.Items)
        }
      }) //return[{ id: 'abcd-ef123-45678-90ab', email: 'bkirkby@kirkby.org' }]
    })
  }
}

export default User
