const express = require('express')
const apiRouter = require('./router')



const app =  express()


app.use("/",apiRouter)
app.get("/",(req,res) => {
    res.send("We are going to mars!")
})
module.exports = app