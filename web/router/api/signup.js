const bodyParser = require('body-parser')
const mysql = require('mysql');
const connection = mysql.createConnection({
    host : 'nodjs-base.cluster-cjskwdik5gvo.ap-south-1.rds.amazonaws.com',
    user : 'admin',
    password : 'c7508TAN!',
    database : 'insta_clone'
})
const isEmailValid = (email) => {
    connection.query('SELECT COUNT(*) AS TEMAIL FROM users WHERE email=?',[email],(err,results) => {
        if (err) console.log("Error in Email Validation");
        console.log(results[0].TEMAIL)
        return results[0].TEMAIL ? false : true
    })
}

const register = (firstname, lastname, password, salt, email) => {
    console.log("registerting")
    connection.query('Insert into users (firstname,lastname,password,salt,email) values (?,?,?,?,?)',[firstname,lastname, password, salt, email],(err,results) => {
        if (err) console.log("Error in user registeration");
        console.log(results)
    })
}


exports.jsonParser = bodyParser.json()

exports.signup = (req,res) => {
    body = req.body
    !isEmailValid(body.email) ? register(body.firstname, body.lastname, body.password, body.salt, body.email) : false;
    res.send("Registered")
}

