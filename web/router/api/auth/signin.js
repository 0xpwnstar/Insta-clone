const mysql = require('mysql');
const crypto = require('crypto')
const connection = mysql.createConnection({
    host : 'nodjs-base.cluster-cjskwdik5gvo.ap-south-1.rds.amazonaws.com',
    user : 'admin',
    password : 'c7508TAN!',
    database : 'insta_clone'
})
const isEmailExist = (email, password) => {
    connection.query('SELECT COUNT(*) AS TEMAIL FROM users WHERE email=?',[email],(err,results) => {
        if (err) console.log("Error in Email Validation");
        console.log(results)
        results[0].TEMAIL == 1 ? signin(email, password) : false
    })
}

const signin = (email, password) => {
    salt = connection.query('SELECT salt FROM users WHERE email=?',[email],(err,results) => { if (err) {console.log(err)} else {console.log(results);return results[0]}})
    console.log(salt)
}



exports.signin = (req,res) => {
    body = req.body
    isEmailExist(body.email,body.password)
    res.send("Login")
}