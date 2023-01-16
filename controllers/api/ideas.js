const Idea = require('../../models/Idea')


module.exports = {
    create,
    show
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