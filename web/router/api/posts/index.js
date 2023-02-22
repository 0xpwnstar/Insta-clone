const uploadImage = require('./uploadImages');
const express = require('express')
const router = express.Router();

router.use('/uploadImage', uploadImage);
module.exports = router;
