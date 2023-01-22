import {Request, Response} from "express";

export{}
const User = require("../../models/user.model.ts");
const { validationResult } = require('express-validator');
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require("mongoose");

// Services
const userService  = require('../../service/userManager.service/user.service.ts');
const passwordService = require('../../service/password.service/password.service');
const jsonWebTokenService = require('../../service/jsonWebToken.service/jsonWebToken.service');
const imageUploaderService = require('../../service/files.service/imageUploader.service')

const validationFunctionService = require('../../service/validations.service/validationFunction.service')

const bcrypt = require("bcrypt");

module.exports = {


    changeEmail: async (req: Request, res: Response) => {

        if (validationFunctionService.validationFunction(req)){
            return res.status(400).json(validationFunctionService.validationFunction(req))
        }

        if(!jsonWebTokenService.jwtValidity(req.headers.authorization)) return res.status(404).json({'msg': 'Incorrect'})
        const decodedToken = jsonWebTokenService.jwtValidity(req.headers.authorization);

        if(req.body.email !== req.body.emailConfirm) return res.status(400).json({message: "paramètres incorrect"});

        const user = await User.findOne({'email': decodedToken.email});
        const correctPassword = await passwordService.comparePassword(req.body.password, user.password);
        if(!correctPassword) return res.status(403).json({'msg' : 'Mauvais mot de passe'})

        const filter = { "email": decodedToken.email };
        const update = { "email": req.body.email}
        await User.updateOne(filter, update);

        return res.status(200).json({ message: 'Email modifié avec succès'})
    },




    changePassword: async (req: Request, res: Response) => {
        if (validationFunctionService.validationFunction(req)){
            return res.status(400).json(validationFunctionService.validationFunction(req))
        }

        if(!jsonWebTokenService.jwtValidity(req.headers.authorization)) return res.status(404).json({'msg': 'Token incorrect'})
        const decodedToken = jsonWebTokenService.jwtValidity(req.headers.authorization);

        const user = await User.findOne({'email': decodedToken.email});
        if(!userService.passwordVerification(req.body.newPassword)) return res.status(400).json({message: "paramètres incorrect 1"})
        if(!userService.passwordVerification(req.body.newPasswordConfirm)) return res.status(400).json({message: "paramètres incorrect 2"})
        if(req.body.newPassword !== req.body.newPasswordConfirm) return res.status(400).json({message: "paramètres incorrect 3"});

        const correctPassword = await passwordService.comparePassword(req.body.currentPassword, user.password);
        if(!correctPassword) return res.status(403).json({'msg' : 'Mauvais mot de passe'})

        const newPassword = await passwordService.hashPassword(req.body.newPassword);
        user.update({'password' : newPassword});

        const filter = { "email": decodedToken.email };
        const update = { "password": newPassword}

        await User.updateOne(filter, update);
        return res.status(200).json({ msg: 'Mot de passe modificé avec succès'})
    },



    changeAvatar: async (req: Request, res: Response) => {
        if (validationFunctionService.validationFunction(req)){
            return res.status(400).json(validationFunctionService.validationFunction(req))
        }

        if(!jsonWebTokenService.jwtValidity(req.headers.authorization)) return res.status(404).json({'msg': 'Token incorrect'})
        const decodedToken = jsonWebTokenService.jwtValidity(req.headers.authorization);

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
        const newJwt = jsonWebTokenService.generateJwt(userUpdated);
        return res.status(200).json({ msg: 'Avatar modifié avec succès', jwt: newJwt})
    },


    changeShockingContent: async (req: Request, res: Response) => {
        if (validationFunctionService.validationFunction(req)){
            return res.status(400).json(validationFunctionService.validationFunction(req))
        }

         if(!jsonWebTokenService.jwtValidity(req.headers.authorization)) return res.status(400).json({'msg': 'Token incorrect'})
         const decodedToken = jsonWebTokenService.jwtValidity(req.headers.authorization);

         const filter = { "username": decodedToken.username };
         const update = { "shockingContent": req.body.shockingContent }
         User.updateOne(filter, update, null, (err) => {
            if(err){
                return res.status(400).json({ error: 'Modification impossible'})
            }
        })

        const userUpdated = await User.findOne({'email': decodedToken.email});
        const newJwt = jsonWebTokenService.generateJwt(userUpdated);
        return res.status(200).json({ msg: 'Modification effectué !', jwt: newJwt})
    },


    changeVerticalReading: async (req: Request, res: Response) => {
        if (validationFunctionService.validationFunction(req)){
            return res.status(400).json(validationFunctionService.validationFunction(req))
        }


        if(!jsonWebTokenService.jwtValidity(req.headers.authorization)) return res.status(400).json({'msg': 'Token incorrect'})
        const decodedToken = jsonWebTokenService.jwtValidity(req.headers.authorization);

        const filter = { "username": decodedToken.username };
        const update = { "verticalReading": req.body.verticalReading }
        User.updateOne(filter, update, null, (err) => {
            if(err){
                return res.status(400).json({ error: 'Modification impossible'})
            }
        })

        const userUpdated = await User.findOne({'email': decodedToken.email});
        const newJwt = jsonWebTokenService.generateJwt(userUpdated);
        return res.status(200).json({ msg: 'Modification effectué !', 'verticalReading': userUpdated.verticalReading, jwt: newJwt})
    },

}