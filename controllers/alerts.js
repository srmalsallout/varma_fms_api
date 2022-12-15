
const Alert = require("../models/alerts")

const getAllAlerts = async (req, res, next) => {
    try {
        const { DeviceId } = req.params
        let { filters, startDate, endDate } = req.query
        const filtersArray = filters?.split(',')
        const alerts = await Alert.find(
            {
                $and: [
                    { DeviceId },
                    filters != null ? filters != '' ? filters != 0 ? { AlertType: { $in: filtersArray } } : {} : {} : {},
                    startDate != null ? startDate != '' ? { createdAt: { $gte: startDate, $lte: endDate } } : {} : {}
                ]
            }
        ).sort({ createdAt: 1 })
        return res.send({ alerts })
    } catch (error) {
        next(error)
    }
}


module.exports = { getAllAlerts }