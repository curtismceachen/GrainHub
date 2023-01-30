const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 6


module.exports = {
    signup,
    login,
    showProfile,
    editProfile,
    addSubscription,
    removeSubscription
}

async function signup(req, res) {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, SALT_ROUNDS)
        const user = await User.create({
            username: req.body.username, 
            email: req.body.email, 
            password: hashedPass
        })
        // creating a jwt: 
        // the first parameter specifies what to put into the token (in this case, the user document)
        // the second parameter is a "secret" code. This lets the server verify if an incoming jwt is legit or not.
        const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' })
        res.status(200).json(token) // send it to the frontend
    } catch (err) {
        res.status(400).json(err)
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!(await bcrypt.compare(req.body.password, user.password))) throw new Error()
        const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' })
        res.status(200).json(token)
    } catch (error) {
        res.status(400).json('Bad Credentials')
    }
}

async function showProfile(req, res) {
    let user = await User.findById(req.params.id)
    res.json(user)
}

// const s3 = new aws.S3({
//     accessKeyId: process.env.S3_ACCESS_ID,
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//     region: process.env.S3_BUCKET_REGION
// })

async function editProfile(req, res) {
    // function uploadFile(file) {
    //     const fileStream = fs.createReadStream(file.path)
    //     const uploadParams = {
    //         Bucket: 'investing-ideas-bucket',
    //         Body: fileStream,
    //         Key: file.filename
    //     }
    //     return s3.upload(uploadParams).promise()
    // }
    // const result = await uploadFile(req.file)
    console.log(req.body)
    let user = await User.findByIdAndUpdate(req.body._id, {
        // profilePic: req.body.profilePic,
        username: req.body.username,
        email: req.body.email,
        shortDescription: req.body.shortDescription,
        fullDescription: req.body.fullDescription,
        paymentInfo: req.body.paymentInfo,
        // publisherAgreement: req.body.publisherAgreement
    })
    res.json(user)
}

async function addSubscription(req, res) {
    let user = await User.findByIdAndUpdate(req.body.userId,
        { $addToSet: 
            { subscriptions: 
                [{publisherId: req.body.pubId}] }}
    )
    console.log(user)
    res.json(user)
}

async function removeSubscription(req, res) {
    let user = await User.findById(req.body.userId)
    user.subscriptions.pull({publisherId: req.body.pubId})
    user.save()
    res.json(user)
}