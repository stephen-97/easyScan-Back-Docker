import {Request, Response} from "express";
const { body, header } = require("express-validator")

module.exports = {

    userDeleteAccountInValidation : [
        header("authorization")
            .exists()
            .withMessage("Missing Authorization Header"),
        body("password")
            .exists()
            .isString()
            .isLength({min: 3}),
    ],

}
export {}


