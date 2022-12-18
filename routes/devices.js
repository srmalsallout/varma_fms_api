const router = require("express").Router()
const { isAuthenticated } = require("../middlewares/auth")
const { addDevice, getDevice, updateDevice, deleteDevice, getAllDevices }
    = require("../controllers/devicesController")
const { uploadPhoto } = require("../middlewares/upload")
let type = uploadPhoto.single('Image');

router.use(isAuthenticated)

router.post('/', type, addDevice)
router.get('/allDevices', getAllDevices)
router.route('/:deviceId')
    .get(getDevice)
    .put(updateDevice)
    .delete(deleteDevice)




module.exports = router