const mysql = require('mysql');
const crypto = require('crypto')
const connection = mysql.createConnection({
    host : 'nodjs-base.cluster-cjskwdik5gvo.ap-south-1.rds.amazonaws.com',
    user : 'admin',
    password : 'c7508TAN!',
    database : 'insta_clone'
})

salt = () => {
    return Promise((resolve,reject) => {
        connection.query('SELECT salt FROM users WHERE email=?',[email],(err,results) => {
            if (err) {
                return reject(err)
            }
            resolve(results)
        })
    })
}

hashedPassword = () => {
    return Promise((resolve,reject) => {
        connection.query('SELECT password FROM users WHERE email=?',[email],(err,results) => {
            if (err) {
                return reject(err)
            }
            resolve(results)
        })
    })
}


const signInIfEmailExists = (email, password) => {
    connection.query('SELECT COUNT(*) AS TEMAIL FROM users WHERE email=?',[email],(err,results) => {
        if (err) console.log("Error in Email Validation");
        console.log(results[0].TEMAIL)
        return results[0].TEMAIL == 1 ? true : false
    })
}




exports.signin = async (req,res) => {
    body = req.body
    console.log(signInIfEmailExists(body.email,body.password))
    if (signInIfEmailExists(body.email,body.password)) {
        const salt_ = 0;
        const hashedPassword_ = 0;
        console.log("here")
        try {
            salt_ = await salt()
            console.log(salt); 
        } catch (error) {
            console.log(error)
        }
        try {
            hashedPassword_ = await hashedPassword() 
        } catch (error) {
            console.log(error)
        }
        password = crypto.createHmac('sha256',salt).update(password).digest('hex');
        if (password == hashedPassword_) return res.send("Login")
        };
    res.send("Failed");
}