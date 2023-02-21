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
                console.log(results)
                return resolve(results[0].TOT)
            }
    })
    })
}

exports.follow = async (req,res) => {
    body = req.body
    uid1 = body.following_uid
    uid2 = body.followed_uid
    if (alreadyFollowing(uid1, uid2) == 1) {
        res.send({"alreadyFollowing":1})
    }
    else {
        connection.query('Insert into followers SET ?',{uid1, uid2},(err,result) => {
        if (err) console.log("Error in user registeration");
            res.send(result)
        })
    }
}