const { follow } = require('./follow');

const express = require('express')
const router = express.Router();

router.post('/follow', follow)
module.exports = router;
