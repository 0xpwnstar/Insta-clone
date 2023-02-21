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
                return resolve(results[0].TOT)
            }
    })
    })
}

exports.follow = async (req,res) => {
    body = req.body
    following_uid = body.following_uid
    followed_uid = body.followed_uid
    if (followed_uid == following_uid){
        res.send(400)
    }
    let following = 0
    try {
        following = await alreadyFollowing(following_uid, followed_uid)
    } catch (error) {
        res.status(400).send(error)
    }
    if (following) {
        res.status(400)
        res.json({"alreadyFollowing":1}).send()
    }
    else {
        connection.query('Insert into followers SET ?',{following_uid, followed_uid},(err,result) => {
        if (err) console.log("Error in user registeration");
            res.json(result).send()
        })
    }
}