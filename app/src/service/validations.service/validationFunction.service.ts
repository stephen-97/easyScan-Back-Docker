import {Request, Response} from "express";
import {validationResult} from "express-validator";
const { body } = require("express-validator")

const jwt = require("jsonwebtoken");

module.exports = {
    validationFunction : (req: Request ): object => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return{ success: false, errors: errors.array() }
        }
        return null;
    }
}
export {}

