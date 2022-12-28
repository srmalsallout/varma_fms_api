const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    UserId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    Image: { type: Number },
    Latitude: { type: Number },
    Longitude: { type: Number }
}, { timestamps: true })

module.exports = mongoose.model('alert', schema)
