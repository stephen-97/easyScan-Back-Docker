export {}
const express = require("express");
const { signup} = require('../controllers/userController')
const userController = require('../controllers/userController')
const userManagerController = require('../controllers/userManagerController')
const router = express.Router();
const { check } = require('express-validator')

router.post("/signup", userController.signup)
router.post("/signupTest", userController.signupTest)
router.post("/signing", userController.signing)
router.put("/changeEmail", userManagerController.changeEmail)
router.put("/changePassword", userManagerController.changePassword)
router.put("/changeAvatar", userManagerController.changeAvatar)
router.put("/changeShockingContent", userManagerController.changeShockingContent)
router.put("/changeVerticalReading", userManagerController.changeVerticalReading)
router.delete("/delete", userManagerController.delete)
router.delete("/deleteProd", userManagerController.deleteProd)

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
    await res.status(201).json({'mail' : 'test1@hotmail.com', 'rio': '123456'});
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
    await res.status(201).json({
        "mail": "newuser@gendarmerie.interieur.gouv.fr",
        "type": "Bali",
        "cyrusRefProvider": "basic.ref_cyrus_persister",
        "cyrusHostProvider": "dappmcepers01.pgs",
        "cyrus": {
            "uniqueid": "0cx41wj7lbe0f7vr37zhsa3v",
            "uid": "user\/newuser@gendarmerie.interieur.gouv.fr",
            "acls": [
                {
                    "key": "newuser@gendarmerie.interieur.gouv.fr",
                    "value": "lrswipkxtecdan"
                }
            ],
            "msg": "Completed"
        },
        "references": {
            "mail": "newuser@gendarmerie.interieur.gouv.fr",
            "host": "dappmcepers01.pgs",
            "id": "0cx41wj7lbe0f7vr37zhsa3v",
            "perimeter": "MCE",
            "type": "Bali",
            "nom": "nom",
            "prenom": "prenom",
            "displayname": "newuser",
            "active": true
        }
    });
})
module.exports = router;
