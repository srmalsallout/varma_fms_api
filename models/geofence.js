const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    GeoName: {
        type: String,
        required: true
    },
    GeoType: { type: Number, required: true },

    Coordinates: { type: Array, default: [] },
    UserID: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('geofence', schema)



