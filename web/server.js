const express = require('express')
const apiRouter = require('./router')
const cors = require("cors");
const bodyParser = require('body-parser')

var corsOptions = {
    origin: "http://127.0.0.1:3000"
}

const app =  express()
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use("/",apiRouter)
app.get("/",(req,res) => {
    res.send("We are going to mars!")
})
module.exports = app