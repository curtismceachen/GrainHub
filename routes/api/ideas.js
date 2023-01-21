const express = require('express')
const router = express.Router()
const ideasCtrl = require('../../controllers/api/ideas')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


router.post('/create', ideasCtrl.create)
// upload the image 'file' in the /uploads folder, then go to ctrl function
router.post('/uploadImage', upload.single('file'), ideasCtrl.uploadImage)
router.get('/show/:id', ideasCtrl.show)

module.exports = router