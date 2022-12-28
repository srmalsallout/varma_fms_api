const router = require("express").Router()
const { isAuthenticated } = require("../middlewares/auth")
const { uploadPhoto } = require("../middlewares/upload")

const {
    signUp,
    login,
    getProfile,
    editProfile
} = require("../controllers/userController")
let type = uploadPhoto.single('Image');

router.put('/', isAuthenticated, type, editProfile)
router.get('/profile', isAuthenticated, getProfile)
router.post('/', type, signUp)
router.post('/login', login)

module.exports = router