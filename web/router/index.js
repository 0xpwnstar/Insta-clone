const user = require('./api/authentication');
const express = require('express')
const router = express.Router();

router.get('/v1/users',user)

module.exports = router;
