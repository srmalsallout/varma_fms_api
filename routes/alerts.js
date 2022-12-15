const router = require("express").Router()
const { isAuthenticated } = require("../middlewares/auth")
const {
    getAllAlerts
} = require("../controllers/alerts")

router.get('/:DeviceId', isAuthenticated, getAllAlerts)

module.exports = router