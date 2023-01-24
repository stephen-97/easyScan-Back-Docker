import {body} from "express-validator";

export {}
const express = require("express");
const userSignController = require('../controllers/user.controller/userSign.controller')
const userDeleteController = require('../controllers/user.controller/userDelete.controller')

const userUpdateController = require('../controllers/user.controller/userUpdate.controller')

const router = express.Router();

const userSignValidation = require('../service/validations.service/userValidation.service/userSignValidation.service')
const userUpdateValidation = require('../service/validations.service/userValidation.service/userUpdateValidation.service')
const userDeleteValidation = require('../service/validations.service/userValidation.service/userDeleteValidation.service')
// ...rest of the initial code omitted for simplicity.

router.post("/signup", userSignValidation.userSignUpValidation,userSignController.signup)
router.post("/signing", userSignValidation.userSignInValidation, userSignController.signing)
router.put("/changeEmail", userUpdateValidation.userUpdateEmailValidation, userUpdateController.changeEmail)
router.put("/changePassword",  userUpdateValidation.userUpdatePasswordValidation, userUpdateController.changePassword)
router.put("/changeAvatar",  userUpdateValidation.userUpdateAvatarValidation, userUpdateController.changeAvatar)
router.put("/changeShockingContent",  userUpdateValidation.userUpdateShockingContentValidation, userUpdateController.changeShockingContent)
router.put("/changeVerticalReading", userUpdateValidation.userUpdateVerticalReadingValidation,  userUpdateController.changeVerticalReading)
router.delete("/delete", userDeleteValidation.userDeleteAccountInValidation ,userDeleteController.delete)
router.delete("/deleteProd", userDeleteController.deleteProd)

router.delete("/API_1/:mailOldUnite/:mail",  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    await res.status(204).json({"status": 201});
})

router.post("/API_2",  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    await res.status(403).json({"status": 204, "msg": "Informations non valides"});
})

router.delete("/API_3/:mailOldUnite/:mail",  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    await res.status(204).json({"status": 204, "response": req.body});
})

router.post("/API_4",  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    await res.status(201).json({"status": 204, "response": "ressorce supprimée  "});
})

router.delete("/API_5/:mailOldUnite/:mail",  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    await res.status(204).json({"status": 200});
})

router.post("/API_6",  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    await res.status(201).json({});
})

router.delete("/API_7/:mail",  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    await res.status(204).json({"status": 204});
})

router.get("/API_8",  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const emails_array = '["test1@hotmail.com", "test2@hotmail.com", "test3@hotmail.com"]'
    await res.status(200).json(['test1@hotmail.com', 'test2@hotmail.com', 'test3@hotmail.com']);
})

router.post("/API_9",  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body)
    await res.status(200).json({"status": 204});
})
router.post("/API_10",  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    await res.status(201).json({ });
})
module.exports = router;
