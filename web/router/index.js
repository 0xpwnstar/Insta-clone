const v1= require('./api');
const { jsonParser, signup } = require('./api/signup');
const express = require('express')
const router = express.Router();

router.use('/v1', v1);
router.post('/v1/signup',jsonParser,signup)
module.exports = router;
