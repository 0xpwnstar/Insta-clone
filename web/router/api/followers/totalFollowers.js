const mysql = require('mysql')
const connection = mysql.createConnection({
    host : 'nodjs-base.cluster-cjskwdik5gvo.ap-south-1.rds.amazonaws.com',
    user : 'admin',
    password : 'c7508TAN!',
    database : 'insta_clone'
})


totFollowers = (uid) => {
    return new Promise((resolve,reject) => {
        connection.query('select following_uid from followers Inner Join users on users.uid=following_uid where followed_uid=?',[uid],(err,results) => {
            if (err) {return reject(0)} else  {
                return resolve(results[0].followed_uid)
            }
    })
    })
}

exports.followers = async (req,res) => {
    body = req.body
    uid = body.uid
    if (uid) {
        try {
            followers = await totFollowers(uid)
            res.json(followers).send();
        } catch (error) {
            res.status(404).send(error)
        }
    }else {
        res.status(400).json(error).send()
    }
    res.status(400).send()
}