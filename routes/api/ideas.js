const express = require('express')
const router = express.Router()
const ideasCtrl = require('../../controllers/api/ideas')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


console.log('ideas router')
router.post('/create', ideasCtrl.create)
router.post('/uploadImage', upload.single('file'), ideasCtrl.uploadImage)
// router.post('/uploadImage', upload.single('file'), function (err, req, res, next) {
//     if (err)
//         console.log('This is the invalid field: ', err.field)
//         next(err)
// })
// router.post('/uploadImage', ideasCtrl.uploadImage)
router.get('/show/:id', ideasCtrl.show)

module.exports = router