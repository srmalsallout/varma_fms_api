const User = require("../models/user")

const signUp = async (req, res, next) => {
    try {
        const { Email, Password } = req.body
        const user = await User.create({
            UserName: 'Mostafaa',
            Password,
            PhoneNumber: '01121290686',
            Address: 'Ma3aaaaaaaaadi',
            Email,
            Role: "user"
        })
        return res.status(200).json({ user })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signUp
}