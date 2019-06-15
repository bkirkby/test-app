import { buildSchema } from 'graphql'
import User from '../models/user'

export const UserSchema = buildSchema(`
  type Query {
    user(email: String, id: String): User
    users(first: Int!, after: String!): [User]
  },
  type User {
    id: String
    email: String
  },
`)

export const UserRoot = {
  user: async ({ email, id }) => {
    let ret = {}
    if (email) {
      ret = await User.findByEmail(email)
    } else if (id) {
      ret = await User.findById(id)
    }
    return ret
  },
  users: async ({ first, after }) => {
    // first - the max number of items to return
    // after - the last key returned from this call
    return await User.allUsers(first, after)
  }
}
