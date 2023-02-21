const users = require('./users');
const { signup } = require('./signup');
const { signin } = require('./signin');
const logout = require('./logout');
const express = require('express')
const router = express.Router();

router.post('/signup', signup)
router.get('/users', users);
router.post('/signin',signin);
router.get('/logout', logout);
module.exports = router;
