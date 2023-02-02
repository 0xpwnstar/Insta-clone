const mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'nodjs-base.cluster-cjskwdik5gvo.ap-south-1.rds.amazonaws.com',
    user : 'admin',
    password : 'c7508TAN!',
    database : 'insta_clone'
})
const query = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from users',(err,results) => {
            if (err) console.log(err)
            return resolve(results)
        })
    })
}

const user = (req,res) => {
    answer = query().then((users) => users).catch((err) => err)
    console.log(answer)
    res.send({message: answer})
}

module.exports = user;