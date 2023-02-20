const auth = require('./auth');
const followers = require('./followers');

const express = require('express')
const router = express.Router();

router.use('/v1',auth)
router.use('/v1',followers)
module.exports = router;