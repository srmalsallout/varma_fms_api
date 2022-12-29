const router = require("express").Router()
const { isAuthenticated } = require("../middlewares/auth")
const { uploadPhoto } = require("../middlewares/upload")

const {
    signUp,
    login,
    getProfile,
    editProfile,
    checkPassword,
    changePassword
} = require("../controllers/userController")
let type = uploadPhoto.single('Image');


router.route('/').put(isAuthenticated, type, editProfile).post(type, signUp)
router.post('/checkPassword', isAuthenticated, checkPassword)
router.put('/changePassword', isAuthenticated, changePassword)
//router.put('/', isAuthenticated, type, editProfile)
router.get('/profile', isAuthenticated, getProfile)
router.post('/login', login)
//router.post('/', type, signUp)




module.exports = router