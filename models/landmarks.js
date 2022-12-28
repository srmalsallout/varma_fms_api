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
    Image: { type: String },
    Latitude: { type: Number },
    Longitude: { type: Number }
}, { timestamps: true })

module.exports = mongoose.model('landmark', schema)
