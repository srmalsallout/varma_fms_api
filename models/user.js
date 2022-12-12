const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    UserName: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Image: mongoose.Schema.Types.Mixed,
    PhoneNumber: {
        type: String,
        unique: true,
        required: true,
        minlength: 11
    },
    Country: {
        type: String,
        required: true,
        default: "KSA"
    },
    Address: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        unique: true,
        required: true
    },
    Role: {
        type: String,
        required: true,
        default: 'user'
    },
    SMSNotification: {
        type: Boolean,
        default: false
    },
    EmailNotification: {
        type: Boolean,
        default: false
    },
    SpeedType: String,
    IsDeleted: {
        type: Boolean,
        default: false
    },
    Status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'verified']
    }
}, { timestamps: true })

module.exports = mongoose.model('user', schema)