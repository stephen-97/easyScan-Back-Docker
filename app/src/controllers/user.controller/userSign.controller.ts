import {Request, Response} from "express";

export{}
const User = require("../../models/user.model.ts")
const { validationResult } = require('express-validator')
const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require("mongoose")

// Services
const userService  = require('../../service/userManager.service/user.service.ts')
const passwordService = require('../../service/password.service/password.service')
const jsonWebTokenService = require('../../service/jsonWebToken.service/jsonWebToken.service')
const imageUploaderService = require('../../service/files.service/imageUploader.service')
const validationFunctionService = require('../../service/validations.service/validationFunction.service')
import jwt_decode from "jwt-decode";

module.exports = {
    signup: async (req: Request, res: Response) => {

        if (validationFunctionService.validationFunction(req)){
            return res.status(400).json(validationFunctionService.validationFunction(req))
        }

        if(await userService.usernameDatabaseVerification(req.body.username)) return res.status(401).json({status: 401, msg: 'Un compte utilise déjà ce pseudo'})
        if(await userService.emailDatabaseVerification(req.body.email)) return res.status(401).json({status: 401, msg: 'Un compte utilise déjà cet email'})

        // Need hashedPassowrd, tokenVerification for email verification and avatarUploadedFile
        const hashedPassword =  await passwordService.hashPassword(req.body.password);
        const tokenVerification = jsonWebTokenService.generateJwt(req.body.email);
        const avatarFileName = imageUploaderService.avatarUploader(req.body.avatar, req.body.username);

        // Create the new User object
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            verificationToken: tokenVerification,
            verified: false,
            avatar: avatarFileName,
        })

        // Sauvegarde de l'utilisateur
        user.save((err) => {
            if(err){
                if(avatarFileName) {
                    imageUploaderService.avatarDeleteFile(avatarFileName);
                }
                return res.status(400).json({ error: 'Ajout utilisateur impossible'})
            }
        })
        return res.status(200).json({ status: 200, msg: 'Compte en attente de véirfication'})
    },

    signing: async (req: Request, res: Response) => {
        //return res.status(404).json({ msg: req.body})
        //vérifications
        if (validationFunctionService.validationFunction(req)){
            return res.status(400).json(validationFunctionService.validationFunction(req))
        }

        //Vérification login
        const user = await userService.loginVerification(req.body.emailOrUsername)
        if(!user) return res.status(400).json({ msg: 'informations incorrect'})

        //Comparaison des mots de passe
        const correctPassword = await passwordService.comparePassword(req.body.password, user.password)
        if(!correctPassword) return res.status(400).json({ msg: 'informations incorrect'})

        //Génération du token
        const jwt = jsonWebTokenService.generateJwt(user);
        return res.status(200).json({  msg: 'Connexion avec succès', jwt: jwt})
    },
}
/**
 *  const user = new User(req.body)
 *     user.save((err, user) => {
 *         if(err){
 *             console.log(err.code)
 *             return res.status(400).json({
 *                 error: 'Unable to add user'
 *             })
 *         }
 *         return res.json({
 *             message: 'Succes',
 *             status: "200"
 *         })
 *     })
 */