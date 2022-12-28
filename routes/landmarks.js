const { addLandmark, getLandmarks } = require("../controllers/landmarks")
const router = require("express").Router()
const { isAuthenticated } = require("../middlewares/auth")
const { uploadPhoto } = require("../middlewares/upload")
let type = uploadPhoto.single('Image');

router.route('/')
    .get(isAuthenticated, getLandmarks)
    .post(isAuthenticated, type, addLandmark)

module.exports = router