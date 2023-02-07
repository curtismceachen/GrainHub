const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    profilePic: {
        type: String,
        default: 'https://investing-ideas-bucket.s3.us-east-2.amazonaws.com/7091a1eb0b0c92f95b09f25c37c0a8c7'
    },
    username: {type: String, required: true},
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 8,
        required: true
    },
    shortDescription: {
        type: String,
        trim: true,
        maxLength: 70,
        default: '',
    },
    fullDescription: {
        type: String,
        trim: true,
        maxLength: 4000,
        default: '',
    },
    paymentInfo: {type: String},
    publisherAgreement: {
        type: Boolean, 
        default: false
    },
    subscriptions: [{
        publisherId: {
            type: mongoose.Schema.Types.ObjectId,
        },
    }],
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password
            return ret
        }
    }
})

module.exports = mongoose.model('User', userSchema)