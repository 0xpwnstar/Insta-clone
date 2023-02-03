const users = require('./authentication');
const express = require('express')
const router = express.Router();

router.use('/', users);
module.exports = router;
