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

const deleteLandmark = async (req, res, next) => {
    try {
        const { landId } = req.params;
        const { user_id } = req
        const deleteLandmark = await Landmark.findOneAndDelete({ _id: landId, UserId: user_id })
        if (deleteLandmark) {
            return res.status(200).send({ message: "landmark deleted successfully" })
        }
        throw new CustomError('Error while deleting a landmark', 404)
    } catch (error) {
        next(error)
    }
}

const updateLandmark = async (req, res, next) => {
    try {
        const { landId } = req.params;
        const { Name, Longitude, Latitude } = req.body
        let image = '';
        if (req.file) {
            image = await extractUrl(req.file, "varmaLandmarks");
        }
        const findLandmark = await Landmark.findById(landId)
        const updatedLandmark = await Landmark.findByIdAndUpdate(landId,
            { Name, Longitude, Latitude, Image: image == '' ? findLandmark.Image : image },
            { new: true, runValidators: true })
        if (updatedLandmark) {
            return res.status(200).send({ message: "landmark updated successfully", updatedLandmark })
        }
        throw new CustomError('Error while updating a landmark', 404)
    } catch (error) {
        next(error)
    }
}

module.exports = { addLandmark, getLandmarks, deleteLandmark, updateLandmark }
