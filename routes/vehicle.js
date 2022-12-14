const router = require("express").Router()
const { isAuthenticated } = require("../middlewares/auth")
const { addVehicle, getVehicle, updateVehicle, deleteVehicle }
    = require("../controllers/vehiclesController")
router.use(isAuthenticated)

router.post('/', addVehicle)
router.route('/:vehicleId')
    .get(getVehicle)
    .put(updateVehicle)
    .delete(deleteVehicle)


module.exports = router