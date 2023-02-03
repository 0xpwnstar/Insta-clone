const auth = require('./auth');


const express = require('express')
const router = express.Router();

router.get('/v1',auth)
module.exports = router;