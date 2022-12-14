const mongoose = require("mongoose")

const schema = new mongoose.Schema({

    VehicleID: {
        type: Number,
        unique: true,
        required: true
    },
    UserID: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    DeviceID: {
        type: mongoose.Types.ObjectId,
        ref: 'device'
    },
    Name: {
        type: String,
        required: true,
        unique: true
    },
    PlateNumber: {
        type: String,
        required: true,
        unique: true
    },
    SerialNumber: {
        type: String,
        unique: true,
        default: null
    },
    Model: {
        type: String,
        default: null
    },
    Type: {
        type: String,
        default: null
    },
    Color: {
        type: String,
        default: null
    },
    ManufactureYear: {
        type: Date,
        default: null
    },
    FuelType: {
        type: String,
        required: true
    },
    Images: {
        type: Array,
        defaulT: []
    },
    SpeedLimit: {
        type: Number,
        required: true
    },
    TankSize: Number

}, { timestamps: true })

module.exports = mongoose.model('vehicle', schema)