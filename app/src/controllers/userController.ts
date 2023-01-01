import {Request, Response} from "express";

export{}
const User = require("../models/user.model.ts");
const { validationResult } = require('express-validator');
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require("mongoose");
const userService  = require('../service/user.service.ts');
const securityService = require('../service/security.service')
const imageUploaderService = require('../service/imageUploader.service')
const bcrypt = require("bcrypt");
import jwt_decode from "jwt-decode";

module.exports = {
    signup: async (req: Request, res: Response) => {
        //vérifie si la requête n'est pas json vide
        if(!validationResult(req).isEmpty()) return res.status(400).json({status:400, msg: 'Erreur requête'})

        //vérifications
        if(!userService.usernameSyntaxVerification(req.body.username)) return res.status(401).json({status: 401, msg: 'Email non conforme'})
        if(!userService.usernameDatabaseVerification(req.body.username)) return res.status(401).json({status: 401, msg: 'Un compte utilise déjà ce pseudo'})
        if(!userService.emailSyntaxVerification(req.body.email)) return res.status(401).json({status: 401, msg: 'Email non conforme'})
        if(!userService.emailDatabaseVerification(req.body.email)) return res.status(401).json({status: 401, msg: 'Un compte utilise déjà cet email'})
        if(!userService.passwordVerification(req.body.password)) return res.status(401).json({status: 401, msg: 'Mot de passe non conforme'})

        // Need hashedPassowrd, tokenVerification for email verification and avatarUploadedFile
        const hashedPassword =  await securityService.hashPassword(req.body.password);
        const tokenVerification = securityService.generateJwt(req.body.email);
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

        user.save((err) => {
            if(err){
                imageUploaderService.avatarDeleteFile(avatarFileName);
                return res.status(400).json({ error: 'Ajout utilisateur impossible'})
            }
        })
        return res.status(200).json({ status: 200, msg: 'Compte en attente de véirfication'})
    },

    signing: async (req: Request, res: Response) => {

        //Vérifie si la requête n'est pas json vide
        if(!validationResult(req).isEmpty()) return res.json({status:400, msg: 'Erreur requête'})

        //vérifications
        const user = await userService.loginVerification(req.body.emailOrUsername)
        console.log(req.body)

        if(!user) return res.json({ status: 404, msg: 'informations incorrect'})
        const correctPassword = await securityService.comparePassword(req.body.password, user.password)
        if(!correctPassword) return res.json({ status: 404, msg: 'informations incorrect'})

        const jwt = securityService.generateJwt(user);
        return res.json({ status: 200, msg: 'Connexion avec succès', jwt: jwt})
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