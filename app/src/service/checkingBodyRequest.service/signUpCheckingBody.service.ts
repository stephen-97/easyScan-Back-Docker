import {IUser} from "../../models/user.model";

export {}


module.exports = {
    signUpCheckingBody : (body: object) => {
        return null;
    },

    jwtFormatIsCorrect : (jwt: string) => {
        return jwt.split(' ')[0] == "Bearer"
    },

}