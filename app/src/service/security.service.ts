export {}
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {
    hashPassword: async (password: string) => {
        const salt = await bcrypt.genSalt(10);
        return  bcrypt.hash(password, 10, salt)
    },
    generateJwt: (email: string) => {
        let payload = { email: email }
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '24h'});
    },
    comparePassword: async (databasePassword: string, password: string) => {
        bcrypt.compare(password, databasePassword, (err, result) => {
            if(err) throw new Error(err);
            return result;
        });
    }
}



