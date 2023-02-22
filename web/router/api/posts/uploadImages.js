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
        console.log(files)
  
        const id = uuidv4();
        S3.putObject( 
            {
                Bucket: "nodeinstaphotos",
                Key: id,
                ContentType: files.image.mimetype,
                ContentLength: files.image.size,
                Body: fs.createReadStream(files.image.filepath),
            },
            // async (data) => {
            //     await models.upload.create({
            //         id,
            //         file_name: files.file.name,
            //     });
            // }
            {res.json({"id":id}).send()
            return }

        )
    })
    res.status(400).send()
}
module.exports = uploadImage;