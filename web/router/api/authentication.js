const mysql = require('mysql');
const util = require('util');
const config = {
    host : 'nodjs-base.cluster-cjskwdik5gvo.ap-south-1.rds.amazonaws.com',
    user : 'admin',
    password : 'c7508TAN!',
    database : 'insta_clone'
}
const conn = mysql.createConnection(config)
const query = util.promisify(conn.query).bind(conn)
async function users()  {
    var rows = []
    try {
        rows = await query('SELECT * from users')
        }
        finally {
            conn.end();
            console.log(rows)
            return rows
        }
}

const user = (req,res) => {
    answer = users().then(value => value)
    console.log(answer)
    res.send({message: answer})
}

module.exports = user;