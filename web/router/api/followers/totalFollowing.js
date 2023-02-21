const mysql = require('mysql')
const connection = mysql.createConnection({
    host : 'nodjs-base.cluster-cjskwdik5gvo.ap-south-1.rds.amazonaws.com',
    user : 'admin',
    password : 'c7508TAN!',
    database : 'insta_clone'
})


totFollowing = (uid) => {
    return new Promise((resolve,reject) => {
        connection.query('select followed_uid from followers Inner Join users on users.uid=followed_uid where following_uid=?',[uid],(err,results) => {
            if (err) {return reject(0)} else  {
                return resolve(results)
            }
    })
    })
}

exports.following = async (req,res) => {
    body = req.body
    uid = body.uid
    if (uid) {
        try {
            following = await totFollowing(uid)
            res.json(following).send();
        } catch (error) {
            res.status(404).send({error})
        }
    }else {
        res.status(400).send()
    }
    res.status(400).send()
}