const users = require('./authentication');
const { signup } = require('./signup');
const { signin } = require('./signin');
const logout  = require('./logout');
const express = require('express')
const router = express.Router();

router.post('/signup', signup)
router.get('/users', users);
router.post('/signin',signin);
router.post('/logout',logout);
module.exports = router;
