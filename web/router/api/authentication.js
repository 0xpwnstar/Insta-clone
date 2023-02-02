const mysql = require('mysql');
const conn = mysql.createConnection({
    host : 'nodjs-base.cluster-cjskwdik5gvo.ap-south-1.rds.amazonaws.com',
    user : 'admin',
    password : 'c7508TAN!',
    database : 'insta_clone'
})

users = () =>  {
return new Promise((resolve, reject) => {
    conn.query('Select * from users',(err, res) => {
        if (err) {
            return reject(err)
        }
        return resolve(res)
    })
} ) 
}

const user = async (req,res) => {
    try {
        const ans = await users();
        res.status(200).json({elements: ans});
    } catch (error) {
        console.log(error)
        res.send("err")
    }
}

module.exports = user;