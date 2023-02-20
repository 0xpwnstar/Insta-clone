const connection = mysql.createConnection({
    host : 'nodjs-base.cluster-cjskwdik5gvo.ap-south-1.rds.amazonaws.com',
    user : 'admin',
    password : 'c7508TAN!',
    database : 'insta_clone'
})

exports.follow = (req,res) => {
    body = req.body
    var results
    connection.query('Insert into followers SET ?',{body.following_uid, body.followed_uid},(err,res) => {
        if (err) console.log("Error in user registeration");
        results = res
    })
    res.send(res)
}