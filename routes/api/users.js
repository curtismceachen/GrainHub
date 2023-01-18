const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users')

// signup
router.post('/signup', usersCtrl.signup)
// login
router.post('/login', usersCtrl.login)
// edit
router.put('/editprofile', usersCtrl.editProfile)

router.put('/addSubscription', usersCtrl.addSubscription)

router.put('/removeSubscription', usersCtrl.removeSubscription)

module.exports = router