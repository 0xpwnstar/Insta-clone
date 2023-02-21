const { follow } = require('./follow');
const { following } = require('./totalFollowing');
const { followers } = require('./totalFollowers')
const express = require('express')
const router = express.Router();

router.post('/follow', follow)
router.get('/following', following)
router.get('/followers', followers)
module.exports = router;
