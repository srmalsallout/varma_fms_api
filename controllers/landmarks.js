const { extractUrl } = require("../helpers/deviceHelper")
const Landmark = require("../models/landmarks")
const {
    ObjectId
} = require('mongoose').Types;

const addLandmark = async (req, res, next) => {
    try {
        const { user_id } = req;
        const { Name, Longitude, Latitude } = req.body;
        let Image = '';
        if (req.file) {
            Image = await extractUrl(req.file, "varmaLandmarks");
        }
        const landmark = await Landmark.create({ Name, Longitude, Latitude, UserId: user_id, Image });
        if (landmark) { return res.status(200).send({ message: "landmark created successfully", landmark }) }
        else { throw new CustomError('Error while creating a landmark', 500) }
    } catch (error) {
        next(error)
    }
}

const getLandmarks = async (req, res, next) => {
    try {
        const { user_id } = req;
        const landmarks = await Landmark.find({ UserID: user_id })
        return res.send({ landmarks })
    } catch (error) {
        next(error)
    }
}

module.exports = { addLandmark, getLandmarks }
