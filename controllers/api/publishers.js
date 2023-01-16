const User = require('../../models/User')


module.exports = {
    discover,
    showPubProfile
}

async function discover(req, res) {
    let publishers = await User.find({ 'paymentInfo': {$ne: ''}, 'publisherAgreement': true })
    res.json(publishers)
}

async function showPubProfile(req, res) {
    console.log(req.params.id)
    let publisher = await User.findById(req.params.id)
    res.json(publisher)
}