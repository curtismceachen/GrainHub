const User = require('../../models/User')


module.exports = {
    discover,
    showPubProfile,
    becomePublisher
}

async function discover(req, res) {
    let publishers = await User.find({ 'paymentInfo': {$ne: ''}, 'publisherAgreement': true })
    // The user may not be a publisher, so grab them separately.
    // If there is a user (i.e. if they're signed in) then grab their object as well, so that I
    // can access their "subscriptions" and decide to show either a "subscribe" or "unsubscribe"
    // button on the frontend.
    if(req.params.userId !== 'false') {
        let user = await User.findById(req.params.userId)
        let userAndPublishers = {user, publishers}
        res.json(userAndPublishers)
    // If not then just send the publishers
    } else {
        res.json(publishers)
    }
}

async function showPubProfile(req, res) {
    let publisher = await User.findById(req.params.id)
    res.json(publisher)
}

async function becomePublisher(req, res) {
    let user = await User.findByIdAndUpdate(req.body._id, {
        shortDescription: req.body.shortDescription,
        fullDescription: req.body.fullDescription,
        paymentInfo: req.body.paymentInfo,
        publisherAgreement: req.body.publisherAgreement
    })
    res.json(user)
}