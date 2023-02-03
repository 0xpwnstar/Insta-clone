const users = require('./authentication');
const { jsonParser, signup } = require('./signup');
const { signin } = require('./signin');
const express = require('express')
const router = express.Router();

router.post('/signup',jsonParser,signup)
router.get('/users', users);
router.post('/signin',jsonParser,signin);
module.exports = router;
