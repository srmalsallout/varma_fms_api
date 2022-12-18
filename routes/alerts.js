const router = require("express").Router()
const { isAuthenticated } = require("../middlewares/auth")
const {
    getAllAlerts
} = require("../controllers/alerts")

router.get('/', isAuthenticated, getAllAlerts)

module.exports = router