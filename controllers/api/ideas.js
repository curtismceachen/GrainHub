const Idea = require('../../models/Idea')
const aws = require('aws-sdk')
const fs = require('fs')


module.exports = {
    create,
    uploadImage,
    show
}

// s3 bucker info from .env
const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION
})

async function uploadImage(req, res) {
    // upload the image to s3
    function uploadFile(file) {
        const fileStream = fs.createReadStream(file.path)
        const uploadParams = {
            Bucket: 'investing-ideas-bucket',
            Body: fileStream,
            Key: file.filename
        }
        return s3.upload(uploadParams).promise()
    }
    // req.file is where the image is located
    const result = await uploadFile(req.file)

    // remove the image from the local '/uploads' folder
    fs.unlink(req.file.path, async function (err) {
        if (err)
            return res.status(400).json({ success: false, message: err.message })
        
        res.json({location: result.Location})
    })
}

async function create(req, res) {
    let idea = new Idea(req.body)
    await idea.save()
    res.json(idea)
}

async function show(req, res) {
    let ideas = await Idea.find({ 'user': req.params.id})
    res.json(ideas)
}