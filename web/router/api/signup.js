const bodyParser = require('body-parser')
const mysql = require('mysql');
const sha256 = require('sha256');
const connection = mysql.createConnection({
    host : 'nodjs-base.cluster-cjskwdik5gvo.ap-south-1.rds.amazonaws.com',
    user : 'admin',
    password : 'c7508TAN!',
    database : 'insta_clone'
})
const isEmailExist = (firstname, lastname, password, salt, email) => {
    connection.query('SELECT COUNT(*) AS TEMAIL FROM users WHERE email=?',[email],(err,results) => {
        if (err) console.log("Error in Email Validation");
        console.log(results)
        results[0].TEMAIL == 1 ? register(firstname, lastname, password, salt, email) : false
    })
}

const register = (firstname, lastname, password, salt, email) => {
    password = sha256(password+salt);
    console.log("registerting")
    connection.query('Insert into users SET ?',{firstname,lastname,password,salt,email},(err,results) => {
        if (err) console.log("Error in user registeration");
        console.log(results)
    })
}


exports.jsonParser = bodyParser.json()

exports.signup = (req,res) => {
    body = req.body
    isEmailExist(body.firstname,body.lastname,body.password,body.salt, body.email)
    res.send("Registered")
}

