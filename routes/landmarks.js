const { addLandmark, getLandmarks, deleteLandmark, updateLandmark } = require("../controllers/landmarks")
const router = require("express").Router()
const { isAuthenticated } = require("../middlewares/auth")
const { uploadPhoto } = require("../middlewares/upload")
let type = uploadPhoto.single('Image');


router.use(isAuthenticated)

router.route('/')
    .get(getLandmarks)
    .post(type, addLandmark)

router.route('/:landId').delete(deleteLandmark).put(type, updateLandmark)

module.exports = router