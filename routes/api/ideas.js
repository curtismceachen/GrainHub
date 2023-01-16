const express = require('express')
const router = express.Router()
const ideasCtrl = require('../../controllers/api/ideas')


console.log('ideas router')
router.post('/create', ideasCtrl.create)
router.get('/show/:id', ideasCtrl.show)

module.exports = router