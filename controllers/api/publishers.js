const User = require('../../models/User')


module.exports = {
    discover,
    showPubProfile
}

async function discover(req, res) {
    console.log(req.params.id)
    let publishers = await User.find({ 'paymentInfo': {$ne: ''}, 'publisherAgreement': true })
    // the user may not be a publisher, so grabbing separately
    if(req.params.id !== 'false') {
        console.log('we have a user')
        let user = await User.findById(req.params.id)
        let userAndPublishers = {user, publishers}
        res.json(userAndPublishers)
    } else {
        console.log('no user!!!')
        res.json(publishers)
    }
}

async function showPubProfile(req, res) {
    let publisher = await User.findById(req.params.id)
    res.json(publisher)
}