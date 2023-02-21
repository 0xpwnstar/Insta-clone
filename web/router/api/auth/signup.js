const mysql = require('mysql');
const crypto = require('crypto')
const connection = mysql.createConnection({
    host : 'nodjs-base.cluster-cjskwdik5gvo.ap-south-1.rds.amazonaws.com',
    user : 'admin',
    password : 'c7508TAN!',
    database : 'insta_clone'
})


const registerIfEmailExists  = (firstname, lastname, password,  email) => {
    return new Promise((resolve,reject) => {
        connection.query('SELECT COUNT(*) AS TEMAIL FROM users WHERE email=?',[email],(err,results) => {
            if (err) {return reject(0)} return resolve(results[0].TEMAIL)
        })
    })
}

const register = (firstname, lastname, password, email) => {
    salt = crypto.randomBytes(12).toString('hex').slice(0,12);
    password = crypto.createHmac('sha256',salt).update(password).digest('hex');
    return new Promise((resolve,reject) => {
        connection.query('Insert into users SET ?',{firstname,lastname,password,salt,email},(err,results) => {
            console.log(results)
            if (err) {return reject(0)} return resolve(results)
        })
    })
}



exports.signup =async (req,res) => {
    body = req.body
    exists = 0
    try {
       exists = await registerIfEmailExists(body.firstname,body.lastname,body.password, body.email) 
    } catch (error) {
        res.send(error)
    }
    if (!exists) {
        registered = 0
        try {
            registered = await register(body.firstname,body.lastname,body.password, body.email)
            res.send({"registered":registered}) 
        } catch (error) {
            res.send(error)
        }
    }
    else{
        res.send({"email Exists"})
    }
}

