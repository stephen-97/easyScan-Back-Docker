export {}
const express = require("express");
const { signup} = require('../controllers/userController')
const router = express.Router();
const { check } = require('express-validator')

router.post("/hey", signup)

router.get("/API_1",  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({"status": "200"});
})

router.post("/API_2",  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({"status": 202, "message": "Erreur serveur"});
})

router.put("/API_3",  async (req, res) => {
    const token = req.header('Authorization');
    res.setHeader('Content-Type', 'application/json');
    res.json({"status": 201, "response": req.body});
})

router.post("/API_4",  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({"foo": "aaaa3"});
})

router.post("/API_5",  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({"status": 201});
})

router.post("/sign",  async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({"status": 201});
})

module.exports = router;
