import {Request, Response} from "express";

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    changeEmailVerification : (req: Request) => {
        return jwt.replace("Bearer","");
    }
}
export {}


