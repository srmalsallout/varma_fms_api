const Device = require("../models/device")

const addDevice = async (req, res) => {
    try {
        const { DeviceName, SerialNumber, Status, Port } = req.body;
        const { user_id } = req;
        const device = await Device.create({ DeviceName, SerialNumber, Status, Port, UserID: user_id });
        if (device) { return res.status(200).send({ message: "device created successfully", device }) }
        else { throw new CustomError('Error while create a device', 500) }
    } catch (error) {
        next(new CustomError(error.message, error.status))
    }
}


const getDevice = async (req, res) => {
    try {
        const { deviceId } = req.params;
        const { user_id } = req;
        const device = await Device.findOne({ _id: deviceId, UserID: user_id });
        if (device) { return res.status(200).send({ device }) }
        else { throw new CustomError('Error while get a device', 404) }
    } catch (error) {
        next(error)
    }
}


const updateDevice = async (req, res) => {
    try {
        const { deviceId } = req.params;
        const { DeviceName, SerialNumber, Status, Port } = req.body;
        const { user_id } = req;
        const device = await Device.findOneAndUpdate({ _id: deviceId, UserID: user_id }, { DeviceName, SerialNumber, Status, Port }, { new: true, runValidators: true });
        if (device) { return res.status(200).send({ message: "device updated successfully", device }) }
        else { throw new CustomError('Error while updating a device', 400) }
    } catch (error) {
        next(error)
    }
}


const deleteDevice = async (req, res) => {
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

module.exports = { addDevice, getDevice, updateDevice, deleteDevice }