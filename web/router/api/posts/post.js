const uploadImage = require('./uploadImages');
const mysql = require('mysql')
const connection = mysql.createConnection({
    host : 'nodjs-base.cluster-cjskwdik5gvo.ap-south-1.rds.amazonaws.com',
    user : 'admin',
    password : 'c7508TAN!',
    database : 'insta_clone'
})



exports.createPost = async (req,res, next) => {
    body = req.body
    uid = body.uid
    caption = body.caption
    connection.query('Insert into post SET ?',{uid, caption},(err,result) => {
    if (err) res.send({err});
    res.json({result})
    next()
    })
    res.status(400).send()

}