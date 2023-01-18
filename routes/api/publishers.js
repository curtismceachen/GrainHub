const express = require('express')
const router = express.Router()
const publishersCtrl = require('../../controllers/api/publishers')

// GET users
router.get('/discover/:id', publishersCtrl.discover)
router.get('/show/:id', publishersCtrl.showPubProfile)

module.exports = router