const mysql = require('mysql')
const connection = mysql.createConnection({
    host : 'nodjs-base.cluster-cjskwdik5gvo.ap-south-1.rds.amazonaws.com',
    user : 'admin',
    password : 'c7508TAN!',
    database : 'insta_clone'
})

alreadyFollowing = (uid1, uid2) => {
    return new Promise((resolve,reject) => {
        connection.query('SELECT COUNT(*) as TOT FROM followers WHERE followed_uid=? and following_uid=?',[uid2, uid1],(err,results) => {
            if (err) {return reject(0)} else  {
                return resolve(results)
            }
    })
    })
}

exports.follow = async (req,res) => {
    body = req.body
    following_uid = body.following_uid
    followed_uid = body.followed_uid
    if (alreadyFollowing(following_uid, followed_uid)[0].TOT == 1) {
        res.send({"alreadyFollowing":1})
    }
    else {
        connection.query('Insert into followers SET ?',{following_uid, followed_uid},(err,result) => {
        if (err) console.log("Error in user registeration");
            res.send(result)
        })
    }
}