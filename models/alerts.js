const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    DeviceId: {
        type: mongoose.Types.ObjectId,
        ref: 'device',
        required: true
    },
    SerialNumber: { type: String, required: true },
    UserId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    AlertType: { type: Number, required: true },
    AlertMessage: { type: String, required: true },
    Speed: { type: Number },
    Latitude: { type: Number },
    Longitude: { type: Number }

}, { timestamps: true })

module.exports = mongoose.model('alert', schema)


