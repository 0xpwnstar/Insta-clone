const bodyParser = require('body-parser')
const mysql = require('mysql');
const connection = mysql.createConnection({
    host : 'nodjs-base.cluster-cjskwdik5gvo.ap-south-1.rds.amazonaws.com',
    user : 'admin',
    password : 'c7508TAN!',
    database : 'insta_clone'
})
const isEmailValid = (email) => {
    connection.query('SELECT COUNT(*) FROM users WHERE email=?',[email],(err,results) => {
        if (err) console.log("Error in Email Validation");
        console.log(results)
        return results ? false : true
    })
}

const register = (firstname, lastname, password, salt, email) => {
    connection.query('Insert into users (firstname,lastname,password,salt,email) values (?,?,?,?,?)',[firstname,lastname, password, salt, email],(err,results) => {
        if (err) console.log("Error in user registeration");
        console.log(results)
    })
}


exports.jsonParser = bodyParser.json()

exports.signup = (req,res) => {
    body = req.body
    isEmailValid(body.email) ? register(body.firstname, body.lastname, body.password, body.salt, body.email) : false;
    res.send("Registered")
}

