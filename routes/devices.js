const router = require("express").Router()
const { isAuthenticated } = require("../middlewares/auth")
const { addDevice, getDevice, updateDevice, deleteDevice }
    = require("../controllers/devicesController")
router.use(isAuthenticated)

router.post('/', addDevice)
router.route('/:deviceId')
    .get(getDevice)
    .put(updateDevice)
    .delete(deleteDevice)


module.exports = router