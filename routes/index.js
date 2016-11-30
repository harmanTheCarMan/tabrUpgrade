const express = require('express')
const router = express.Router()
const User = require('../database/db').User
const authorize = require('../authentication/passport').authorize

const tabSort = (one, two) => {
  if( one.rank < two.rank ) {
    return -1
  } else if( one.rank > two.rank ) {
    return 1
  } else {
    return 0
  }
}

router.get( '/', authorize, (request, response, next) => {
  const { id } = request.user

  Promise.all([  User.tabs( id ), User.tasks( id ) ])
    .then( result => {
      const rows = result[ 1 ]
      const tabs = result[ 0 ].map( tab =>
        Object.assign( {}, tab, { tasks:
          rows.filter( row => row.tabs_id === tab.id ).sort( tabSort )
        })
      )
      response.render('index', { user: request.user, tabs })
    })
    .catch( error =>
      response.render( 'index', { user: request.user, tabs: [], message: 'An error occurred.' })
    )
})

module.exports = router
