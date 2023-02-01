const user = require('./api/authentication');
const { jsonParser, signup } = require('./api/signup');
const express = require('express')
const router = express.Router();

router.get('/v1/users',user)
router.post('/v1/signup',jsonParser,signup)
module.exports = router;
