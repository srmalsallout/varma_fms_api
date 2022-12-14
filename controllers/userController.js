const User = require("../models/user")
const { CustomError } = require("../utils/errors")
const { compare } = require("bcryptjs")

const signUp = async (req, res, next) => {
    try {
        // throw new Error("here to test")
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
        //console.log(Object.keys(error.errors), error.errors.properties);
        next(new CustomError(error.message, error.status))
    }
}

const login = async (req, res, next) => {
    try {
        const { Email, Password } = req.body
        if (!Email || !Password) return next(new CustomError('email and password required', 400))

        const user = await User.findOne({ Email })
        if (!user) return next(new CustomError('user not found', 401))

        const verify = await compare(Password, user.Password)
        if (!verify) return next(new CustomError('email or password are invalid', 401))

        return res.status(200).json({ user, token: user.generateToken() })
    } catch (error) {
        next(new CustomError(error.message, error.status || 500))
    }
}

module.exports = {
    signUp,
    login
}