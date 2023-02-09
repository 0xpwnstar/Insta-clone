const users = require('./authentication');
const { signup } = require('./signup');
const { signin } = require('./signin');
const client  = require('./logout');
const express = require('express')
const router = express.Router();

router.post('/signup', signup)
router.get('/users', users);
router.post('/signin',signin);
router.post('/logout',(req,res) => {
    // Use client.request to make a JSON-RPC request call.
// The function returns a promise of the result.
    client
        .request("echo", { text: "I am logout!" })
        .then((result) => res.send(result));

    client.notify("log", { message: "Yo whatsapp" });
});
module.exports = router;
