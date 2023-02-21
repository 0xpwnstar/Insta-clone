const mysql = require('mysql');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const connection = mysql.createConnection({
    host : 'nodjs-base.cluster-cjskwdik5gvo.ap-south-1.rds.amazonaws.com',
    user : 'admin',
    password : 'c7508TAN!',
    database : 'insta_clone'
})

salt = (email) => {
    return new Promise((resolve,reject) => {
        connection.query('SELECT salt FROM users WHERE email=?',[email],(err,results) => {
            if (err) {
                return reject(err)
            }
            resolve(results)
        })
    })
}

hashedPassword = (email) => {
    return new Promise((resolve,reject) => {
        connection.query('SELECT password FROM users WHERE email=?',[email],(err,results) => {
            if (err) {
                return reject(err)
            }
            resolve(results)
        })
    })
}

userExists = (email) => {
    return new Promise((resolve,reject) => {
        connection.query('SELECT COUNT(*) AS TEMAIL FROM users WHERE email=?',[email],(err,results) => {
            if (err) {return reject(0)} else {
                return resolve(results[0].TEMAIL)
            }
    })
    })
}

userId = (email) => {
    return new Promise((resolve,reject) => {
        connection.query('SELECT uid FROM users WHERE email=?',[email],(err,results) => {
            if (err) {return reject(0)} return resolve(results[0].uid)
    })
    })
}


exports.signin = async (req,res) => {
    body = req.body
    let exists = 0
    try {
        exists = await userExists(body.email)
    } catch (error) {
        res.send(error)
    }
    if (exists) {
        let s = 0;
        let hashedPassword_ = 0;
        try {
            s = await salt(body.email) 
        } catch (error) {
            res.send(error)
        }
        try {
            h = await hashedPassword(body.email) 
        } catch (error) {
            res.send(error)
        }
        if (s && h){
            password = crypto.createHmac('sha256',s[0].salt).update(body.password).digest('hex');
            if (password == h[0].password) {
                const uid = await userId(body.email);
                if (uid) {
                    var token = jwt.sign(uid,"lavda")
                    res.cookie('authcookie', token,{maxAge:900000,httpOnly:true})
                    return res.send({uid})
                    }
                }
            };
        }
    res.send("Failed");
}