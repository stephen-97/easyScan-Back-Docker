import {IUser} from "../../models/user.model";
const utilityService = require("../utility.service/utility.service")

const jwt = require("jsonwebtoken");

export {}


module.exports = {
    generateJwt: (user: IUser) => {
        let payload = {
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            createdAd: utilityService.convertDatetimeToFormat(user.createdAt),
            verticalReading: user.verticalReading,
            shockingContent: user.shockingContent,
        }
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '24h'});
    },
    jwtValidity: (token: string) => {
        let JsonWebToken = token.replace("Bearer ","");
        let decodedJWT = null;
        jwt.verify(JsonWebToken, process.env.JWT_SECRET_KEY,  (err, decoded )=> {
            if (err) return;
            decodedJWT = decoded
        });
        return decodedJWT;
    },

}