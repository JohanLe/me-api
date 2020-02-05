const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const express = require("express");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();

const fn = require('./functions');

const app = express();
const port = 8333;

const index = require('./routes/index.js');
const reports = require('./routes/reports.js');
const auth = require('./routes/auth.js');

const db = new sqlite3.Database('./db/texts.sqlite');

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing


if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});
// jwt random stringsss
//37c2bb11e85cc162e948990e9eead95eb84fffb2cead166d461b9bf1846003bdf1d46fa53520e571392589cc91e4e4785d54f45662c04ac4d88f836cfc48abfb
console.log("api startar");
app.use("/auth", auth);
app.use('/reports/', reports);
app.use('/', index);


// TODO ändra till egen route/.js fil
app.post('/register', (req, res) => {

    const userID = fn.createUserID(10)
    console.log(process.env.JWT_SECRET);
    fn.hashAndSetPassword(userID, req.body.password)
        .then((hash) => {
            req.body.password = hash.data;
            fn.registerUser(req.body, userID);

        }).catch((e) => {
            console.log("error")
            console.log(e);
            res.status(200).json({
                data: {
                    msg: "error: " + e
                }
            });
        });

    res.status(200).json({
        data: {
            msg: "received request"
        }
    });


});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status || 500 || 502).json({
        "errors": [
            {
                "status": err.status,
                "title": err.message,
                "detail": err.message
            }
        ]
    });
});


// Start up server
// app.listen(port, () => console.log(`Example API listening on port ${port}!`));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = server;
