const uploadImage = require('./uploadImages');
const { createPost } = require('./post');
const express = require('express')
const router = express.Router();
router.use('/post', createPost, uploadImage);
router.use('/uploadImage', uploadImage);
module.exports = router;
