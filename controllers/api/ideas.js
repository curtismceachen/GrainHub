const Idea = require('../../models/Idea')
const User = require('../../models/User')
const aws = require('aws-sdk')
const fs = require('fs')
// const { default: UserLogout } = require('../../src/components/UserLogout/UserLogout')


module.exports = {
    create,
    uploadImage,
    show,
    ideasFeed
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

async function ideasFeed(req, res) {
    let user = await User.findById(req.params.userId)
    let subscriptionIds = user.subscriptions.map(s => s.publisherId)
    let publishers = await User.find({'_id': { $in: subscriptionIds}})
    let allPublishersIdeas = await Idea.find({'user': { $in: subscriptionIds }})
    let ideasWithPubUsername = allPublishersIdeas.map(idea => {
        let subPub = publishers.find(s => String(s._id) == String(idea.user))
        if (!subPub) return null 
        return {
            id: idea._id,
            title: idea.title,
            thesis: idea.thesis,
            ticker: idea.ticker,
            longOrShort: idea.longOrShort,
            publisher: {
                id: idea.user,
                username: subPub.username
            }
        }
    })
    res.json(ideasWithPubUsername)
}