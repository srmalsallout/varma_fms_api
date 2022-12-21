const { addGeofence, getGeofences } = require("../controllers/geofence")
const router = require("express").Router()
const { isAuthenticated } = require("../middlewares/auth")

router.route('/')
    .get(isAuthenticated, getGeofences)
    .post(isAuthenticated, addGeofence)

module.exports = router