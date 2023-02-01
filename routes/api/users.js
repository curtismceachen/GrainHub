const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users')

// signup
router.post('/signup', usersCtrl.signup)
// login
router.post('/login', usersCtrl.login)

router.get('/getProfile/:userId', usersCtrl.getProfile)
// edit
router.put('/editProfile', usersCtrl.editProfile)

router.put('/addSubscription', usersCtrl.addSubscription)

router.put('/removeSubscription', usersCtrl.removeSubscription)

module.exports = router