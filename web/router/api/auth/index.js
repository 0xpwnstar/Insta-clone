const users = require('./authentication');
const { jsonParser, signup } = require('./signup');
const express = require('express')
const router = express.Router();

router.post('/signup',jsonParser,signup)
router.get('/users', users);
module.exports = router;
