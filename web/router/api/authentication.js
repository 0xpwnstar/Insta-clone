const mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'nodjs-base.cluster-cjskwdik5gvo.ap-south-1.rds.amazonaws.com',
    user : 'admin',
    password : 'c7508TAN!',
    database : 'insta_clone'
})

const query = () => {
    connection.connect();
    connection.query('SELECT * from users',(err,results) => {
        if (err) console.log(err);
        console.log(results)
        return results
    })
}

const user = (req,res) => {
    
    res.send(query())
}

module.exports = user;