const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    DeviceName: {
        type: String,
        required: true
    },
    SerialNumber: {
        type: String,
        unique: true,
        required: true
    },
    Status: {
        type: String,
        default: 'enabled',
        enum: ['enabled', 'disabled']
    },
    Port: {
        type: Number,
        required: true,
        default: 5455
    },
    UserID: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('device', schema)