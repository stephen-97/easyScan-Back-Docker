import * as path from "path";

const apiRoutes = require("./src/routes/router.ts");
const express = require('express')
const { PORT = '3000' } = process.env
const app = express()
require('dotenv').config()


const mongoose = require("mongoose");
mongoose.connect("mongodb://root:root@db_easyScan:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err){
        console.log(err)
    }
});

app.use(express.json({limit: '200mb'}));

app.get('/', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE, PUT, OPTIONS");
    res.send('Hello World a')
})
app.use(express.json())


app.use(express.static(path.resolve('./src')));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
/******* ROUTES *******/
app.use("/API", apiRoutes);

app.listen(PORT, () => console.log(`Running on s`));



