const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const User = require('./models/User')


const ideaSchema = new Schema({
    title: {
        type: String,
        maxlength: 130,
        required: true
    },
    thesis: {
        type: String,
    },
    ticker: {
        type: String,
    },
    longOrShort: {
        type: String,
    },
    editorState: {
        type: String,
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',

    },
})

module.exports = mongoose.model('Idea', ideaSchema)