import { Strategy, ExtractJwt } from 'passport-jwt'
import User from './models/user'

const secret = process.env.JWT_SECRET || 'devsecret'

console.log('bk: secret: ', secret)

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}

export default passport => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      User.findByEmail(payload.email)
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id,
              name: user.name,
              email: user.email
            })
          }
        })
        .catch(err => console.err(err))
    })
  )
}
