const router = require("express").Router()
const { isAuthenticated } = require("../middlewares/auth")
const { addDevice, getDevice, updateDevice, deleteDevice, getAllDevices }
    = require("../controllers/devicesController")
router.use(isAuthenticated)

router.post('/', addDevice)
router.get('/allDevices', getAllDevices)
router.route('/:deviceId')
    .get(getDevice)
    .put(updateDevice)
    .delete(deleteDevice)




module.exports = router