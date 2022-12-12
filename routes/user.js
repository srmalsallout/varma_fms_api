const router = require("express").Router()
const { isAuthenticated } = require("../middlewares/auth")
const {
    signUp
} = require("../controllers/user")

router.post('/', signUp)

module.exports = router