import {Request, Response} from "express";
const { body } = require("express-validator")

module.exports = {

    userSignInValidation : [
        body("emailOrUsername")
            .exists().bail()
            .isString().bail()
            .withMessage('Need to be a string')
            .isLength({min: 3}).bail()
            .withMessage('Wrong length'),
        body("password")
            .exists().bail()
            .isString().bail()
            .withMessage('Need to be a string')
            .isLength({min: 3}).bail()
            .withMessage('Wrong length'),
    ],

    userSignUpValidation : [
        body("email")
            .exists().bail()
            .isEmail().bail()
            .withMessage('Need to be an email')
            .isLength({min: 3}).bail(),
        body("username")
            .exists().bail()
            .isString().bail()
            .withMessage('Need to be an string')
            .isLength({min: 3, max: 15}).bail()
            .withMessage('Wrong length'),
        body("password")
            .exists().bail()
            .isString().bail()
            .withMessage('Need to be string')
            .isLength({min: 5, max: 15})
            .withMessage('Wrong length'),
        body("avatar")
            .isBase64()
            .optional({checkFalsy: true})
            .bail(),
    ]
}
export {}


