import {IUser} from "../../models/user.model";

export {}


module.exports = {
    jwtRemoveBearerFromString : (jwt: string) => {
        return jwt.replace("Bearer ","");
    },

    jwtFormatIsCorrect : (jwt: string) => {
        return jwt.split(' ')[0] == "Bearer"
    },

}