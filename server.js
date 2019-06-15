import express from 'express'
import graphqlHTTP from 'express-graphql'
import logger from 'morgan'
import { UserSchema, UserRoot } from './graphql/UserSchema'
import passport from 'passport'
import passportConfig from './passport-config'
import usersRouter from './routes/users'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const corsOptions = {
  origin(origin, callback) {
    if (!origin || origin.indexOf(process.env.CORS_MATCH) != -1) {
      callback(null, true)
    } else {
      callback(null, false)
    }
  },
  credentials: true
}

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(passport.initialize())
app.use(cors(corsOptions))

passportConfig(passport)

app.use('/users', usersRouter)

app.options('/graphql', function(req, res) {
  res.json({ message: 'all good' })
})

app.use('/graphql', passport.authenticate('jwt', { session: false }), function(
  req,
  res,
  next
) {
  next()
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema: UserSchema,
    rootValue: UserRoot,
    graphiql: true
  })
)

app.get('/secret', passport.authenticate('jwt', { session: false }), function(
  req,
  res
) {
  res.json({ message: 'success! you cannot see this without a token!' })
})

const api_port = process.env.API_SERVER_PORT

app.listen(api_port)
console.log(`running a graphql api server at localhost:${api_port}`)
