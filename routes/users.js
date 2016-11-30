const express = require('express')
const router = express.Router()
const User = require('../database/db').User
const passport = require('../authentication/passport').passport

const loginRedirects = {
  successRedirect: '/',
  failureRedirect: '/users/login'
}

router.get( '/register', (request, res, next) => {
  res.render('register')
})

router.post( '/register', (request, res) => {
  const { email, password } = request.body

  User.create( email, password )
    .then( user => {
      request.login( user, error => {
        if( error ) {
          return next( error )
        }
        res.redirect('/')
      })
    })
})

router.get( '/login', (request, res, next) => {
  res.render('login', { user: request.user})
})

router.post('/login', passport.authenticate( 'local', loginRedirects ))

router.get( '/logout', (request, response) => {
  request.logout()
  response.redirect( '/' )
})

module.exports = router
