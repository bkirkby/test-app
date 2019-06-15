import express from 'express'
import User from '../models/user'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import passport from 'passport'
import jwt from 'jsonwebtoken'

dotenv.config()
const jwtSecret = process.env.JWT_SECRET || 'the default secret'
const router = express.Router()

const jwtSign = (payload, cb) => {
  jwt.sign(payload, jwtSecret, { expiresIn: 36000, algorithm: 'HS512' }, cb)
}

router.post('/register', (req, res) => {
  User.findByEmail(req.body.email)
    .then(user => {
      let error = {
        type: 'USER_EXISTS',
        message: 'email address already exists'
      }
      console.log(error)
      return res.status(400).json(error)
    })
    .catch(err => {
      let newUser = new User({
        email: req.body.email,
        password: req.body.password
      })
      newUser
        .save()
        .then(user => {
          const payload = { email: user.email }
          jwtSign(payload, (err, token) => {
            if (err) {
              res.status(500).json({ error: 'error signing token', raw: err })
            }
            res.json({
              success: true,
              token: `Bearer ${token}`
            })
          })
        })
        .catch(err => {
          console.log(err)
          res.status(400).json(err)
        })
    })
})

router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  User.findByEmail(email)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          email: 'user not found'
        })
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = { email: user.email }
          jwtSign(payload, (err, token) => {
            if (err) {
              res.status(500).json({ error: 'error signing token', raw: err })
            }
            res.json({
              success: true,
              token: `Bearer ${token}`
            })
          })
        } else {
          res.status(401).json({
            password: 'password is incorrect'
          })
        }
      })
    })
    .catch(err => res.status(404).json({ error: 'user not found' }))
})

export default router
