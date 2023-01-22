import {Request, Response} from "express";
const { body } = require("express-validator")

const jwt = require("jsonwebtoken");

module.exports = {

    userSignInValidation : [
        body("emailOrUsername")
            .exists()
            .isString()
            .isLength({min: 3}),
        body("password")
            .exists()
            .isString()
            .isLength({min: 3}),
    ],

    userSignUpValidation : [
        body("email")
            .exists()
            .isEmail()
            .isString()
            .isLength({min: 3}),
        body("username")
            .exists()
            .isEmail()
            .isString()
            .isLength({max: 15}),
        body("password")
            .exists()
            .isString()
            .isLength({min: 5, max: 15}),
        body("confirmPassword")
            .exists()
            .isString()
            .isLength({min: 5, max: 15}),
        body("avatar")
            .optional()
            .isBase64(),
    ]
}
export {}


