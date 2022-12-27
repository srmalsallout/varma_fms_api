const router = require("express").Router()
const { isAuthenticated } = require("../middlewares/auth")
const {
    signUp,
    login,
    getProfile
} = require("../controllers/userController")

router.get('/profile', isAuthenticated, getProfile)
router.post('/', signUp)
router.post('/login', login)

module.exports = router