const router = require("express").Router()
const { isAuthenticated } = require("../middlewares/auth")
const {
    signUp,
    login
} = require("../controllers/userController")

router.post('/', signUp)
router.post('/login', login)

module.exports = router