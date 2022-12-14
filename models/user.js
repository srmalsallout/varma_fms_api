const mongoose = require("mongoose")
const { hash } = require("bcryptjs")
const { sign } = require("jsonwebtoken")
const { isMobilePhone, isEmail } = require("validator")
const { CustomError } = require("../utils/errors")


const schema = new mongoose.Schema({
    UserName: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Image: mongoose.Schema.Types.Mixed,
    PhoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!isMobilePhone(value, ["ar-EG"])) {
                throw new Error("Please Enter a Correct Phone Number");
            }
        },
    },
    Country: {
        type: String,
        required: true,
        default: "KSA"
    },
    Address: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!isEmail(value)) {
                throw new Error("Please Enter a Correct Email");
            }
        }
    },
    Role: {
        type: String,
        required: true,
        default: 'user'
    },
    SMSNotification: {
        type: Boolean,
        default: false
    },
    EmailNotification: {
        type: Boolean,
        default: false
    },
    SpeedType: String,
    IsDeleted: {
        type: Boolean,
        default: false
    },
    Status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'verified']
    }
}, { timestamps: true })

schema.pre('save', async function (next) {
    this.Password = await hash(this.Password, 10)
    next()
})


schema.methods.toJSON = function () {
    const data = this.toObject();
    delete data.Password;
    return data;
};

schema.methods.generateToken = function () {
    return sign({
        id: this._id,
        role: this.Role
    }, process.env.JWT_SECRET)
}

module.exports = mongoose.model('user', schema)