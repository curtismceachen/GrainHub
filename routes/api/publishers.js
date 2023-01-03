const express = require('express')
const router = express.Router()
const publishersCtrl = require('../../controllers/api/publishers')

// GET users
router.get('/', publishersCtrl.discover)

module.exports = router