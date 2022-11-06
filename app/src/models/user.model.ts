export{}
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: 15,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    verificationToken: {
        type: String,
        required: false,
        trim: true,
    },
    avatar: {
        type: String,
        required: false,
        trim: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true})


module.exports = mongoose.model('User', userModel);