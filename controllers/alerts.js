
const Alert = require("../models/alerts")
const Device = require("../models/device")
const {
    ObjectId
} = require('mongoose').Types;
const getAllAlerts = async (req, res, next) => {
    try {
        const { user_id } = req;
        let { filters, deviceId } = req.query
        const filtersArray = filters?.split(',')

        const alerts = await Alert.find(
            {
                $and: [
                    { UserId: user_id },
                    deviceId != null ? deviceId != '' ? { DeviceId: deviceId } : {} : {},
                    filters != null ? filters != '' ? filters != 0 ? { AlertType: { $in: filtersArray } } : {} : {} : {},
                ]
            }
        ).sort({ createdAt: 1 })
        return res.send({ alerts })
    } catch (error) {
        next(error)
    }
}


module.exports = { getAllAlerts }