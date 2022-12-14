const User = require("../models/user")
const { CustomError } = require("../utils/errors")
const { compare } = require("bcryptjs")

const signUp = async (req, res, next) => {
    try {
        const { UserName, Email, Password, PhoneNumber, Address, Role } = req.body
        const user = await User.create({
            UserName,
            Password,
            PhoneNumber,
            Address,
            Email,
            Role: Role || "user"
        })
        return res.status(200).json({ user, token: user.generateToken() })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { Email, Password } = req.body
        if (!Email || !Password) throw new CustomError('email and password required', 400)

        const user = await User.findOne({ Email })
        if (!user) throw new CustomError('user not found', 401)

        const verify = await compare(Password, user.Password)
        if (!verify) throw new CustomError('email or password are invalid', 401)

        return res.status(200).json({ user, token: user.generateToken() })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signUp,
    login
}