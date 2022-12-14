const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    IdentityNumber: {
        type: String,
        unique: true,
        required: true
    },
    LicenceNumber: {
        type: String,
        unique: true,
        required: true
    },
    IsDeleted: {
        type: Boolean,
        default: false
    },
    ParentID: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    VehicleID: {
        type: mongoose.Types.ObjectId,
        ref: 'vehicle',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('driver', schema)