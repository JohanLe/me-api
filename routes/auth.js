var express = require('express');
var router = express.Router();
var fn = require('../functions');

router.get('/', function (req, res, next) {

});

router.post('/login', (req, res, next) => {
    console.log(req.body.email);
    fn.getPassword(req.body.email)
        .then((hash) => {

            return fn.comparePassword(req.body.password, hash.password)
        })
        .then((loggedIn) => {
            if (loggedIn) {
                var token = fn.createToken(req.body.email);
                return res.json({
                    data: {
                        type: "success",
                        message: "User logged in",
                        user: req.body.email,
                        token: token
                    }
                });
            }
        })
        .catch((e) => {
            console.log("error");
            console.log(e);
            return res.json({
                data: {
                    type: "failed",
                    message: "Failed to login",
                }
            });
        });


});

module.exports = router;
