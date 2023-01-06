const User = require('../../models/User')


module.exports = {
    discover
}

async function discover(req, res) {
    let publishers = await User.find({ 'paymentInfo': {$ne: ''}, 'publisherAgreement': true })
    res.json(publishers)
}