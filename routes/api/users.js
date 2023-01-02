const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users')

// signup
router.post('/signup', usersCtrl.signup)
// login
router.post('/login', usersCtrl.login)
// GET users
router.get('/', usersCtrl.discover)

module.exports = router