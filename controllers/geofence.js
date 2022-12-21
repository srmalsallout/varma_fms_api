const Geofence = require("../models/geofence")
const Device = require("../models/device")
const {
    ObjectId
} = require('mongoose').Types;
const addGeofence = async (req, res, next) => {
    try {
        const { user_id } = req;
        const { GeoName, GeoType, DeviceId, Coordinates } = req.body;

        const geofence = await Geofence.create({ GeoName, GeoType, Coordinates, UserID: user_id });
        const updateDevice = await Device.findByIdAndUpdate(DeviceId, { GeofenceId: geofence._id })
        if (geofence) { return res.status(200).send({ message: "Geofence created successfully", geofence }) }
        else { throw new CustomError('Error while create a Geofence', 500) }
    } catch (error) {
        next(error)
    }
}

const getGeofences = async (req, res, next) => {
    try {
        const { user_id } = req;
        const agg = [
            {
                $match: { UserID: ObjectId(user_id) }
            },
            {
                $lookup: {
                    from: 'devices',
                    localField: '_id',
                    foreignField: 'GeofenceId',
                    as: 'device',
                }
            },
            {
                $unwind: "$device"
            }
        ]

        const allGeofences = await Geofence.aggregate(agg)
        return res.send({ allGeofences })
    } catch (error) {
        next(error)
    }
}

module.exports = { addGeofence, getGeofences }
