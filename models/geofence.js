const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    GeoName: {
        type: String,
        required: true
    },
    GeoType: { type: String, required: true },
    Speed: { type: Number },
    Coordinates: { type: Array, default: [] },
    UserID: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('geofence', schema)



