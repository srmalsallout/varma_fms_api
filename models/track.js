const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    RecordDateTime: {
        type: Date,
        required: true
    },
    DeviceId: {
        type: mongoose.Types.ObjectId,
        ref: 'device',
        required: true
    },

    DeviceTypeID: {
        type: Number,
        required: true
    },
    Latitude: {
        type: String,
        required: true
    },
    Longitude: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('track', schema)
