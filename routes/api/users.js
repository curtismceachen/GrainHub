const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users')

// signup
router.post('/signup', usersCtrl.signup)
// login
router.post('/login', usersCtrl.login)
// edit
router.put('/editprofile', usersCtrl.editProfile)

module.exports = router