const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const AWS = require("aws-sdk");
const S3 = new AWS.S3({
    signatureVersion: "v4",
    apiVersion: "2006-03-01",
    accessKeyId: "AKIAQ3KD6NZVWP4DAA5Z",
    secretAccessKey: "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",
    region: "ap-south-1",
});

const uploadImage =  (req, res ) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(400).send(err)
        }
  
        const id = uuidv4();
        S3.putObject( 
            {
                Bucket: "nodeinstaphotos",
                Key: id,
                ContentType: files.file.type,
                ContentLength: files.file.size,
                Body: fs.createReadStream(files.file.path),
            },
            async (data) => {
                await models.upload.create({
                    id,
                    file_name: files.file.name,
                    user_id: req.user.id,
                });
                res.json({"id":id}).send()
            }
        )
    })
    res.status(400).send()
}
module.exports = uploadImage;