export{}
const mongoose = require("mongoose");
import { Schema, model, connect} from "mongoose";

const bcrypt = require("bcryptjs");

export interface IUser {
    username: string,
    email: string,
    password: string,
    verificationToken: string,
    avatar: string,
    verified: boolean,
    createdAt: number,
}

const userModel = new Schema<IUser>({
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


module.exports = model<IUser>('User', userModel);