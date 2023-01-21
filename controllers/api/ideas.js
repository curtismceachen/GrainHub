const Idea = require('../../models/Idea')
const aws = require('aws-sdk')
const fs = require('fs')


module.exports = {
    create,
    uploadImage,
    show
}


const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION
})

async function uploadImage(req, res) {
    function uploadFile(file) {
        const fileStream = fs.createReadStream(file.path)
        const uploadParams = {
            Bucket: 'skatespotter',
            Body: fileStream,
            Key: file.filename
        }
        return s3.upload(uploadParams).promise()
    }
    const result = await uploadFile(req.file)
    console.log(result)

    fs.unlink(req.file.path, async function (err) {
        if (err)
            return res.status(400).json({ success: false, message: err.message })
        
        console.log(JSON.stringify({location: result.Location}))
        res.json({location: result.Location})
    })
}

async function create(req, res) {
    console.log(req.body.editorState)
    let idea = new Idea(req.body)
    await idea.save()
    res.json(idea)
}

async function show(req, res) {
    let ideas = await Idea.find({ 'user': req.params.id})
    res.json(ideas)
}