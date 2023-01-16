const Idea = require('../../models/Idea')


module.exports = {
    create
}

async function create(req, res) {
    let idea = new Idea(req.body)
    await idea.save()
    res.json(idea)
}