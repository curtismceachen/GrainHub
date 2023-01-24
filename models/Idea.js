const mongoose = require('mongoose')
const Schema = mongoose.Schema


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
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
    },
    // need to add timestamps to these
})

module.exports = mongoose.model('Idea', ideaSchema)