export {}
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import {IUser} from "../models/user.model";


module.exports = {
    hashPassword: async (password: string) => {
        const salt = await bcrypt.genSalt(10);
        return await new Promise((res, rej) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if(err) rej(err);
                res(hash)
            })
        })
    },
    generateJwt: (user: IUser) => {
        let payload = {
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            createdAd: user.createdAt
        }
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '24h'});
    },
    comparePassword: async (password: string, databasePassword: string) => {
        return await new Promise((res, rej) => {
            bcrypt.compare(password, databasePassword, (err, result) => {
                if(err) rej(err);
                res(result);
            });
        })
    },
    jwtValidity: (token: string) => {
        let decodedJWT = null;
        jwt.verify(token, process.env.JWT_SECRET_KEY,  (err, decoded )=> {
            if (err) return;
            decodedJWT = decoded
        });
        return decodedJWT;
    },
    jwtRemoveBearerFromString : (jwt: string) => {
        return jwt.replace("Bearer","");
    }
}



