import {Request, Response} from "express";
import {header} from "express-validator";
const { body } = require("express-validator")

const jwt = require("jsonwebtoken");

module.exports = {

    userUpdateEmailValidation : [
        header("authorization")
            .exists()
            .withMessage("Missing Authorization Header"),
        body("email")
            .exists()
            .isEmail(),
        body("emailConfirm")
            .exists()
            .isEmail(),
        body("password")
            .exists()
            .isString()
            .isLength({min: 3})
    ],

    userUpdatePasswordValidation : [
        header("authorization")
            .exists()
            .withMessage("Missing Authorization Header"),
        body("newPassword")
            .exists()
            .isString()
            .isLength({min: 3}),
        body("newPasswordConfirm")
            .exists()
            .isString()
            .isLength({min: 3}),
        body("currentPassword")
            .exists()
            .isString()
            .isLength({min: 3})
    ],

    userUpdateAvatarValidation : [
        header("authorization")
            .exists()
            .withMessage("Missing Authorization Header"),
        body("avatar")
            .exists()
            .isBase64()
            .isLength({min: 3}),
    ],

    userUpdateShockingContentValidation : [
        header("authorization")
            .exists()
            .withMessage("Missing Authorization Header"),
        body("shockingContent")
            .exists()
            .isBoolean()
    ],

    userUpdateVerticalReadingValidation : [
        header("authorization")
            .exists()
            .withMessage("Missing Authorization Header"),
        body("verticalReading")
            .exists()
            .isBoolean()
    ],

}
export {}


