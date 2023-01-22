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
            .isEmail()
            .withMessage("Need to be an email"),
        body("emailConfirm")
            .exists()
            .isEmail()
            .withMessage("Need to be an email"),
        body("password")
            .exists()
            .isString()
            .withMessage("Need to be an String")
            .isLength({min: 3})
            .withMessage("Wrong length"),
    ],

    userUpdatePasswordValidation : [
        header("authorization")
            .exists()
            .withMessage("Missing Authorization Header"),
        body("newPassword")
            .exists().bail()
            .isString().bail().withMessage("Need to be an String")
            .isLength({min: 3}).bail().withMessage("Wrong length"),
        body("newPasswordConfirm")
            .exists().bail()
            .isString().bail().withMessage("Need to be an String")
            .isLength({min: 3}).bail().withMessage("Wrong length"),
        body("currentPassword")
            .exists().bail()
            .isString().bail()
            .withMessage("Need to be an String")
            .isLength({min: 3}).bail()
            .withMessage("Wrong length")
    ],

    userUpdateAvatarValidation : [
        header("authorization")
            .exists()
            .withMessage("Missing Authorization Header"),
        body("avatar")
            .exists()
            .isBase64()
            .withMessage("Need to be base64")
            .isLength({min: 3})
            .withMessage("Wrong length"),
    ],

    userUpdateShockingContentValidation : [
        header("authorization")
            .exists()
            .withMessage("Missing Authorization Header"),
        body("shockingContent")
            .exists()
            .isBoolean()
            .withMessage("Need to be Boolean")
    ],

    userUpdateVerticalReadingValidation : [
        header("authorization")
            .exists()
            .withMessage("Missing Authorization Header"),
        body("verticalReading")
            .exists()
            .isBoolean()
            .withMessage("Need to be Boolean")
    ],

}
export {}


