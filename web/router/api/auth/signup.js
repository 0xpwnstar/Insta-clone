const mysql = require('mysql');
const crypto = require('crypto')
const connection = mysql.createConnection({
    host : 'nodjs-base.cluster-cjskwdik5gvo.ap-south-1.rds.amazonaws.com',
    user : 'admin',
    password : 'c7508TAN!',
    database : 'insta_clone'
})
const registerIfEmailExists = (firstname, lastname, password,  email) => {
    connection.query('SELECT COUNT(*) AS TEMAIL FROM users WHERE email=?',[email],(err,results) => {
        if (err) console.log("Error in Email Validation");
        console.log(results)
        results[0].TEMAIL == 0 ? register(firstname, lastname, password, email) : false
    })
}

const register = (firstname, lastname, password, email) => {
    salt = crypto.randomBytes(12).toString('hex').slice(0,12);
    password = crypto.createHmac('sha256',salt).update(password).digest('hex');
    console.log("registerting")
    connection.query('Insert into users SET ?',{firstname,lastname,password,salt,email},(err,results) => {
        if (err) console.log("Error in user registeration");
        console.log(results)
    })
}



exports.signup = (req,res) => {
    body = req.body
    registerIfEmailExists(body.firstname,body.lastname,body.password, body.email)
    res.send("Registered")
}

