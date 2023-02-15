const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users')
const multer = require('multer')
const upload = multer({ dest: 'uploads/'})

// signup
router.post('/signup', usersCtrl.signup)
// login
router.post('/login', usersCtrl.login)

router.get('/getProfile/:userId', usersCtrl.getProfile)

router.post('/uploadFullDescripImage', upload.single('file'), usersCtrl.uploadFullDescripImage)
// edit
router.put('/editProfile', upload.single('profilePic'), usersCtrl.editProfile)

router.put('/addSubscription', usersCtrl.addSubscription)

router.put('/removeSubscription', usersCtrl.removeSubscription)

module.exports = router