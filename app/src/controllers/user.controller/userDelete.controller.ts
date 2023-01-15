import {Request, Response} from "express";

export{}
const User = require("../../models/user.model.ts");
const securityService = require('../../service/security.service')
const jsonWebTokenService = require('../../service/jsonWebToken.service/jsonWebToken.service');

module.exports = {


    delete: async (req: Request, res: Response) => {
        const jwt = jsonWebTokenService.jwtRemoveBearerFromString(req.headers.authorization)
        if(!securityService.jwtValidity(jwt)) return res.status(404).json({'msg': 'Token incorrect'})
        const decodedToken = securityService.jwtValidity(jwt);

        const user = await User.findOne({'email': decodedToken.email});
        const correctPassword = await securityService.comparePassword(req.body.password, user.password);
        if(!correctPassword) return res.status(403).json({'msg' : 'Mauvais mot de passe'})

        await User.deleteOne({"email" : user.email})
        return res.status(200).json({ msg: 'Compte supprimé !'})
    },


    deleteProd: async (req: Request, res: Response) => {

        await User.deleteOne({"username" : req.body.username})
        return res.status(200).json({ msg: 'Compte supprimé !'})
    },
}