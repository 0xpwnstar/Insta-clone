const mysql = require('mysql');
const crypto = require('crypto')
const connection = mysql.createConnection({
    host : 'nodjs-base.cluster-cjskwdik5gvo.ap-south-1.rds.amazonaws.com',
    user : 'admin',
    password : 'c7508TAN!',
    database : 'insta_clone'
})

salt = (email) => {
    return Promise((resolve,reject) => {
        connection.query('SELECT salt FROM users WHERE email=?',[email],(err,results) => {
            if (err) {
                return reject(err)
            }
            resolve(results)
        })
    })
}

hashedPassword = (email) => {
    return Promise((resolve,reject) => {
        connection.query('SELECT password FROM users WHERE email=?',[email],(err,results) => {
            if (err) {
                return reject(err)
            }
            resolve(results)
        })
    })
}








exports.signin = async (req,res) => {
    body = req.body
    if (connection.query('SELECT COUNT(*) AS TEMAIL FROM users WHERE email=?',[body.email],(err,results) => {
        if (err) {return 0} return 1
    })) {
        const salt_ = 0;
        const hashedPassword_ = 0;
        console.log("here")
        try {
            salt_ = await salt(body.email)
            console.log(salt); 
        } catch (error) {
            console.log(error)
        }
        try {
            hashedPassword_ = await hashedPassword(body.email) 
        } catch (error) {
            console.log(error)
        }
        password = crypto.createHmac('sha256',salt).update(body.password).digest('hex');
        if (password == hashedPassword_) return res.send("Login")
        };
    res.send("Failed");
}