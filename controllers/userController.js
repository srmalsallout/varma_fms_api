const User = require("../models/user")
const { CustomError } = require("../utils/errors")
const { compare, hash } = require("bcryptjs")
const { extractUrl } = require("../helpers/deviceHelper")

const signUp = async (req, res, next) => {
    try {
        const { UserName, Email, Password, PhoneNumber, Address, Role } = req.body
        let Image = '';
        if (req.file) {
            Image = await extractUrl(req.file, "varmaUsers");
        }
        const user = await User.create({
            UserName,
            Password,
            PhoneNumber,
            Address,
            Email,
            Image,
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

const getProfile = async (req, res, next) => {
    try {
        const { user_id } = req;
        console.log(user_id);
        const user = await User.findById(user_id);
        if (user) {
            return res.send({ user })
        }
        throw new CustomError('user are not Found', 404)
    } catch (error) {
        next(error)
    }
}

const editProfile = async (req, res, next) => {
    try {
        const { user_id } = req
        const { UserName, PhoneNumber, Address, Email, EmailNotification, SMSNotification } = req.body
        const findUser = await User.findById(user_id);
        let image = '';
        if (req.file) {
            image = await extractUrl(req.file, "varmaUsers");
        }
        const updatedUser = await User.findByIdAndUpdate(user_id,
            { UserName, PhoneNumber, Address, Email, Image: image == '' ? findUser.Image : image, EmailNotification, SMSNotification },
            { runValidators: true, new: true })
        if (updatedUser) {
            return res.status(200).send({ message: "profile updated successfully", updatedUser })
        }
        throw new CustomError('Error while updating profile, please try again', 404)
    } catch (error) {
        next(error)
    }
}


const checkPassword = async (req, res, next) => {
    try {
        const { user_id } = req
        const { oldPassword } = req.body
        if (!oldPassword) { throw new CustomError('please add a valid password', 400) }
        const user = await User.findById(user_id)
        const verify = await compare(oldPassword, user.Password)
        if (verify) return res.status(200).send({ verify })
        else return res.status(400).send({ verify })
    } catch (error) {
        next(error)
    }
}

const changePassword = async (req, res, next) => {
    try {
        const { user_id } = req
        const { newPassword } = req.body
        if (!newPassword) { throw new CustomError('please add a valid password', 400) }
        const updatedPassword = await hash(newPassword, 10)
        const updatedUser = await User.findByIdAndUpdate(user_id, { Password: updatedPassword })
        if (updatedUser) return res.status(200).send({ message: "password updated successfully" })
        else throw new CustomError('Sorry Error happen while updating password', 400)
    } catch (error) {
        next(error)
    }
}



module.exports = {
    signUp,
    login,
    getProfile,
    editProfile,
    checkPassword,
    changePassword
}