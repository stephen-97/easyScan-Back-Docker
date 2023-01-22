import {Request, Response} from "express";

export{}
const User = require("../../models/user.model.ts");

// Services
const passwordService = require('../../service/password.service/password.service');
const jsonWebTokenService = require('../../service/jsonWebToken.service/jsonWebToken.service');
const validationFunctionService = require('../../service/validations.service/validationFunction.service');

module.exports = {


    delete: async (req: Request, res: Response) => {

        if (validationFunctionService.validationFunction(req)){
            return res.status(400).json(validationFunctionService.validationFunction(req))
        }

        if(!jsonWebTokenService.jwtValidity(req.headers.authorization)) return res.status(404).json({'msg': 'Token incorrect'})
        const decodedToken = jsonWebTokenService.jwtValidity(req.headers.authorization);

        const user = await User.findOne({'email': decodedToken.email});
        const correctPassword = await passwordService.comparePassword(req.body.password, user.password);
        if(!correctPassword) return res.status(403).json({'msg' : 'Mauvais mot de passe'})

        await User.deleteOne({"email" : user.email})
        return res.status(200).json({ msg: 'Compte supprimé !'})
    },


    deleteProd: async (req: Request, res: Response) => {

        await User.deleteOne({"username" : req.body.username})
        return res.status(200).json({ msg: 'Compte supprimé !'})
    },
}