import {Request, Response} from "express";

const User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {


    usernameDatabaseVerification:  async (username: string) => {
        return await new Promise((res, rej) => {
            User.findOne({ username: username}, (err, result) => {
                if(err) rej(err);
                res(result)
            })
        })
    },

    emailDatabaseVerification: async (email: string) => {
        return await new Promise((res, rej) => {
            User.findOne({ email: email}, (err, result) => {
                if(err) rej(err);
                res(result)
            })
        })
    },

    emailSyntaxVerification: (email: string): boolean => {
        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
    },



    passwordVerification: (password: string): boolean => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
    },


    loginVerification: async (usernameOrEmail: string) => {
        switch (module.exports.emailSyntaxVerification(usernameOrEmail)){
            case true: {
                return await new Promise((res, rej) => {
                    User.findOne({ email: usernameOrEmail}, (err, result) => {
                        if(err) rej(err);
                        res(result)
                    })
                })
            }
            default: {
                return await new Promise((res, rej) => {
                    User.findOne({ username: usernameOrEmail}, (err, result) => {
                        if(err) rej(err);
                        res(result)
                    })
                })
            }
        }
    }
}
export {}


