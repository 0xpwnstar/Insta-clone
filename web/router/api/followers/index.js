const { follow } = require('./follow');
const { following } = require('./totalFollowing');
const { followers } = require('./totalFollowers')
const express = require('express')
const router = express.Router();

router.post('/follow', follow)
router.post('/following', following)
router.post('/followers', followers)
module.exports = router;
