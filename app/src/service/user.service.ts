import {Request, Response} from "express";

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    usernameSyntaxVerification: (username: string): boolean => {
        return username.length > 3 && username.length < 20;
    },
    usernameDatabaseVerification: (username: string): boolean => {
        User.findOne({ username: username}, (err, result) => {
            if(result) {
                return false
            }
        })
        return  true
    },
    emailSyntaxVerification: (email: string): boolean => {
        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
    },
    emailDatabaseVerification: (email: string): boolean => {
        User.findOne({ email: email}, (err, result) => {
            if(result) {
                return false
            }
        })
        return  true
    },
    passwordVerification: (password: string): boolean => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
    },
}
export {}


