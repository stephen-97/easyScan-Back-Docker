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
import {dirname} from "path";


exports.signup = (req: Request, res: Response) => {
    //vérifie si la requête n'est pas json vide
    if(!validationResult(req).isEmpty()) return res.status(400).json({status:400, msg: 'Erreur requête'})

    //vérifications
    if(!userService.usernameSyntaxVerification(req.body.username)) return res.status(401).json({status: 401, msg: 'Email non conforme'})
    if(!userService.usernameDatabaseVerification(req.body.username)) return res.status(401).json({status: 401, msg: 'Un compte utilise déjà ce pseudo'})
    if(!userService.emailSyntaxVerification(req.body.email)) return res.status(401).json({status: 401, msg: 'Email non conforme'})
    if(!userService.emailDatabaseVerification(req.body.email)) return res.status(401).json({status: 401, msg: 'Un compte utilise déjà cet email'})
    if(!userService.passwordVerification(req.body.password)) return res.status(401).json({status: 401, msg: 'Mot de passe non conforme'})

    let hashedPassword;
    securityService.hashPassword(req.body.password).then((result: string) => {
        hashedPassword = result;
    }).catch((err) => {
        throw new Error(err);
    })
    const tokenVerification = securityService.generateJwt(req.body.email);

    let avatarFileName = null;
    if(req.body.avatar) avatarFileName = imageUploaderService.avatarUploader(req.body.avatar, req.body.username);
    console.log(hashedPassword)
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        verificationToken: tokenVerification,
        verified: false,
        avatar: avatarFileName,
    })

    user.save((err) => {
        console.log(err)
        if(err){
            imageUploaderService.avatarDeleteFile(avatarFileName);
            return res.status(400).json({ error: 'Ajout utilisateur impossible'})
        }
    })
    return res.status(200).json({ status: 200, msg: 'Compte en attente de véirfication'})

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