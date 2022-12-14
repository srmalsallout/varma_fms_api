const Vehicle = require("../models/vehicle")

const addVehicle = async (req, res) => {
    try {
        const { VehicleID, DeviceID, Name, PlateNumber, SerialNumber, Model, Type, Color, ManufactureYear, FuelType, Images, SpeedLimit, TankSize } = req.body;
        const { user_id } = req;
        const vehicle = await Vehicle.create({
            VehicleID, UserID: user_id, DeviceID, Name, PlateNumber,
            SerialNumber, Model, Type, Color, ManufactureYear, FuelType, Images, SpeedLimit, TankSize
        });

        if (vehicle) { return res.status(200).send({ message: "Vehicle created successfully", vehicle }) }
        else { return next(new CustomError('Error while create a Vehicle', 500)) }
    } catch (error) {
        next(new CustomError(error.message, error.status || 500))
    }
}


const getVehicle = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const { user_id } = req;
        const vehicle = await Vehicle.findOne({ _id: vehicleId, UserID: user_id });
        if (vehicle) { return res.status(200).send({ vehicle }) }
        else { return next(new CustomError('Error while get a vehicle', 404)) }
    } catch (error) {
        next(new CustomError(error.message, error.status || 500))
    }
}


const updateVehicle = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const { VehicleID, DeviceID, Name, PlateNumber, SerialNumber, Model, Type, Color, ManufactureYear, FuelType, Images, SpeedLimit, TankSize } = req.body;
        const { user_id } = req;
        const vehicle = await Vehicle.findOneAndUpdate({ _id: vehicleId, UserID: user_id },
            { VehicleID, DeviceID, Name, PlateNumber, SerialNumber, Model, Type, Color, ManufactureYear, FuelType, Images, SpeedLimit, TankSize },
            { new: true, runValidators: true });
        if (vehicle) { return res.status(200).send({ message: "vehicle updated successfully", vehicle }) }
        else { return next(new CustomError('Error while updating a vehicle', 400)) }
    } catch (error) {
        next(new CustomError(error.message, error.status || 500))
    }
}


const deleteVehicle = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const { user_id } = req;
        const vehicle = await Vehicle.findOneAndDelete({ _id: vehicleId, UserID: user_id });
        if (vehicle) { return res.status(200).send({ message: "Vehicle deleted successfully" }) }
        else { return next(new CustomError('Error while deleting a Vehicle', 400)) }
    } catch (error) {
        next(new CustomError(error.message, error.status || 500))
    }
}

module.exports = { addVehicle, getVehicle, updateVehicle, deleteVehicle }