import {Request, Response} from "express";

export{}
const User = require("../../models/user.model.ts");
const { validationResult } = require('express-validator');
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require("mongoose");
const userService  = require('../../service/user.service.ts');
const securityService = require('../../service/security.service')
const jsonWebTokenService = require('../../service/jsonWebToken.service/jsonWebToken.service');
const imageUploaderService = require('../../service/imageUploader.service')
const bcrypt = require("bcrypt");

module.exports = {


    changeEmail: async (req: Request, res: Response) => {
        const jwt = jsonWebTokenService.jwtRemoveBearerFromString(req.headers.authorization)

        if(!securityService.jwtValidity(jwt)) return res.status(404).json({'msg': 'Incorrect'})
        const decodedToken = securityService.jwtValidity(jwt);

        if(!userService.emailSyntaxVerification(req.body.email)) return res.status(400).json({'msg' : 'Paramètres incorrects'})
        if(!userService.emailSyntaxVerification(req.body.emailConfirm)) return res.status(400).json({'msg' : 'Paramètres incorrects'})
        if(req.body.email !== req.body.emailConfirm) return res.status(400).json({message: "paramètres incorrect"});

        const user = await User.findOne({'email': decodedToken.email});
        const correctPassword = await securityService.comparePassword(req.body.password, user.password);
        if(!correctPassword) return res.status(403).json({'msg' : 'Mauvais mot de passe'})

        const filter = { "email": decodedToken.email };
        const update = { "email": req.body.email}

        await User.updateOne(filter, update);
        return res.status(200).json({ message: 'Email modifié avec succès'})
    },




    changePassword: async (req: Request, res: Response) => {
        const jwt = jsonWebTokenService.jwtRemoveBearerFromString(req.headers.authorization)
        if(!securityService.jwtValidity(jwt)) return res.status(404).json({'msg': 'Token incorrect'})
        const decodedToken = securityService.jwtValidity(jwt);

        const user = await User.findOne({'email': decodedToken.email});
        if(!userService.passwordVerification(req.body.newPassword)) return res.status(400).json({message: "paramètres incorrect 1"})
        if(!userService.passwordVerification(req.body.newPasswordConfirm)) return res.status(400).json({message: "paramètres incorrect 2"})
        if(req.body.newPassword !== req.body.newPasswordConfirm) return res.status(400).json({message: "paramètres incorrect 3"});

        const correctPassword = await securityService.comparePassword(req.body.currentPassword, user.password);
        if(!correctPassword) return res.status(403).json({'msg' : 'Mauvais mot de passe'})

        const newPassword = await securityService.hashPassword(req.body.newPassword);
        user.update({'password' : newPassword});

        const filter = { "email": decodedToken.email };
        const update = { "password": newPassword}

        await User.updateOne(filter, update);
        return res.status(200).json({ msg: 'Mot de passe modificé avec succès'})
    },



    changeAvatar: async (req: Request, res: Response) => {
        if(!securityService.jwtValidity(req.headers.authorization)) return res.status(404).json({'msg': 'Token incorrect'})
        const decodedToken = securityService.jwtValidity(req.headers.authorization);

        const user = await User.findOne({'email': decodedToken.email});
        if(decodedToken.avatar) imageUploaderService.avatarDeleteFile(user.avatar)
        const newAvatarFileName = imageUploaderService.avatarUploader(req.body.avatar, user.username);

        const update = { "avatar": newAvatarFileName };
        const filter = { "email": user.email }
        User.updateOne(filter, update, null, (err) => {
            if(err){
                imageUploaderService.avatarDeleteFile(newAvatarFileName);
                return res.status(400).json({ error: 'Modification impossible'})
            }
        })

        const userUpdated = await User.findOne({'email': decodedToken.email});
        const newJwt = securityService.generateJwt(userUpdated);
        return res.status(200).json({ msg: 'Avatar modifié avec succès', jwt: newJwt})
    },


    changeShockingContent: async (req: Request, res: Response) => {
         if(typeof req.body.shockingContent !== "boolean") return res.status(400).json({'msg': 'Mauvais paramètres'})

         const jwt = jsonWebTokenService.jwtRemoveBearerFromString(req.headers.authorization)
         if(!securityService.jwtValidity(jwt)) return res.status(400).json({'msg': 'Token incorrect'})
         const decodedToken = securityService.jwtValidity(jwt);

         const filter = { "username": decodedToken.username };
         const update = { "shockingContent": req.body.shockingContent }
         User.updateOne(filter, update, null, (err) => {
            if(err){
                return res.status(400).json({ error: 'Modification impossible'})
            }
        })

        const userUpdated = await User.findOne({'email': decodedToken.email});
        const newJwt = securityService.generateJwt(userUpdated);
        return res.status(200).json({ msg: 'Modification effectué !', jwt: newJwt})
    },


    changeVerticalReading: async (req: Request, res: Response) => {
        if(typeof req.body.verticalReading !== "boolean") return res.status(400).json({'msg': 'Mauvais paramètres'})

        const jwt = jsonWebTokenService.jwtRemoveBearerFromString(req.headers.authorization)
        if(!securityService.jwtValidity(jwt)) return res.status(400).json({'msg': 'Token incorrect'})
        const decodedToken = securityService.jwtValidity(jwt);

        const filter = { "username": decodedToken.username };
        const update = { "verticalReading": req.body.verticalReading }
        User.updateOne(filter, update, null, (err) => {
            if(err){
                return res.status(400).json({ error: 'Modification impossible'})
            }
        })

        const userUpdated = await User.findOne({'email': decodedToken.email});
        const newJwt = securityService.generateJwt(userUpdated);
        return res.status(200).json({ msg: 'Modification effectué !', 'verticalReading': userUpdated.verticalReading, jwt: newJwt})
    },

}