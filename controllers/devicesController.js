const Device = require("../models/device")
const Track = require("../models/track")
const { CustomError } = require("../utils/errors")
const {
    ObjectId
} = require('mongoose').Types;
const { extractUrl } = require("../helpers/deviceHelper")

const addDevice = async (req, res, next) => {
    try {
        const { DeviceName, SerialNumber, Status, Port } = req.body;
        const { user_id } = req;
        let Image = ''
        if (req.file) {
            Image = await extractUrl(req.file, "varmaDevices");
        }
        const device = await Device.create({ DeviceName, SerialNumber, Status, Port, UserID: user_id, Image });
        if (device) { return res.status(200).send({ message: "device created successfully", device }) }
        else { throw new CustomError('Error while create a device', 500) }
    } catch (error) {
        next(error)
    }
}


const getDevice = async (req, res, next) => {
    try {
        const { deviceId } = req.params;
        let agg = [
            {
                $lookup: {
                    from: 'devices',
                    localField: 'DeviceId',
                    foreignField: '_id',
                    as: 'device',
                }
            },
            { $unwind: "$device" },
            { $match: { DeviceId: ObjectId(deviceId) } },
            { $sort: { RecordDateTime: -1 } },
            { $limit: 1 }
        ]

        const device = await Track.aggregate(agg);
        if (device) { return res.status(200).send({ device }) }
        else { throw new CustomError('Error while get a device', 404) }
    } catch (error) {
        next(error)
    }
}


const updateDevice = async (req, res, next) => {
    try {
        const { deviceId } = req.params;
        const { DeviceName, SerialNumber, Status, Port } = req.body;
        const { user_id } = req;
        const device = await Device.findOneAndUpdate({ _id: deviceId, UserID: user_id },
            { DeviceName, SerialNumber, Status, Port }, { new: true, runValidators: true });

        if (device) { return res.status(200).send({ message: "device updated successfully", device }) }
        else { throw new CustomError('Error while updating a device', 400) }
    } catch (error) {
        next(error)
    }
}
const deleteDevice = async (req, res, next) => {
    try {
        const { deviceId } = req.params;
        const { user_id } = req;
        const device = await Device.findOneAndDelete({ _id: deviceId, UserID: user_id });
        if (device) { return res.status(200).send({ message: "device deleted successfully" }) }
        else { throw new CustomError('Error while deleting a device', 400) }
    } catch (error) {
        next(error)
    }
}


const getAllDevices = async (req, res, next) => {
    try {
        const { user_id } = req;

        let agg = [
            {
                $match: { UserID: ObjectId(user_id) }
            },
            {
                $lookup: {
                    from: 'tracks',
                    localField: '_id',
                    foreignField: 'DeviceId',
                    as: 'track',
                }
            },
            {
                "$addFields": {
                    "location": {
                        "$arrayElemAt": ["$track", 0]
                    }
                }
            },
            {
                $project: { "track": 0, "__v": 0 }
            }
        ]
        const allDevices = await Device.aggregate(agg);
        return res.send({ allDevices })
    } catch (error) {
        next(error)
    }
}

const getDeviceHistory = async (req, res, next) => {
    try {
        const { DeviceId } = req.params;
        const { StartDate, EndDate, DeviceType } = req.query;
        if (!DeviceId || !StartDate || !EndDate || StartDate == '' || EndDate == '') {
            return next(new CustomError('Please Provide a valid Data', 400))
        }
        const history = await Track.find({
            DeviceType, DeviceId: ObjectId(DeviceId),
            $and: [
                { RecordDateTime: { $gte: StartDate, $lte: EndDate } },
                DeviceType == '0' ? {} : { DeviceTypeID: +DeviceType }
            ]
        }).populate('DeviceId', 'DeviceName').sort({ RecordDateTime: 1 })
        return res.send({ history })
    } catch (error) {
        next(error)
    }
}

module.exports = { addDevice, getDevice, updateDevice, deleteDevice, getAllDevices, getDeviceHistory }