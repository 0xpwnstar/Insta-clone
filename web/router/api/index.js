const auth = require('./auth');


const express = require('express')
const router = express.Router();

router.get('/users',auth)
module.exports = router;