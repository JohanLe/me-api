
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
 const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

const functions = {

    getReport: (week)=>{

    },
    createToken: (email) => {
        const payload = {email: email};
        const secret = "hemligkod"
        console.log(secret);
        return jwt.sign(payload, secret, {expiresIn: '1h'});
    },


    createUserID: (length) => {
        var result = '';
        var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

    checkToken: (req, res, next) => {

        jwt.verify(req.body.token, "hemligkod", function (err, decoded) {
            if (err) {
                console.log({
                    name: err.name,
                    message: err.message,
                    expiredAt: err.expiredAt
                });
                return err;
            }
            console.log(decoded);
            next();
        });
    },

    hashAndSetPassword: (userID, password) => {
        return new Promise((resolve, reject) => {
            var test = "";
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) {
                        console.log(err);
                    }
                    resolve({
                        msg: "Successfull",
                        data: hash
                    });
                });
            });
        });

    },

    registerUser: (body, userID) => {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO users (id, email, password, fullname, birthdate) VALUES(?, ?, ?, ?, ?);",
                userID,
                body.email,
                body.password,
                body.fullname,
                body.birthdate,
                (err) => {
                    if (err) {
                        reject({msg: err});
                    }
                    resolve({msg: "Registration succesfull"});
                    console.log("User Registered");
                });
        });
    },


    comparePassword: (password, hash) => {
        console.log("COMPARE");
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash).then((res) => {
                if (res) {
                    console.log("SUCCESS");
                    resolve(res);
                }
                reject("Wrong password");
            });
        });
    },

    getPassword: (email) => {
        return new Promise((resolve, reject) => {
            db.get("select password from users where email = ?;", email, (err, row) => {
                if (err || row === undefined) {
                    reject("Could't retrive user from database");
                }
                resolve(row);
            });
        });
    },

    createNewreport: (week, data) =>{
        return new Promise((resolve, reject)=>{
            db.run("INSERT INTO reports (week, text) VALUES (?, ?)",
            week,
            data,
            (err)=>{
                if(err){
                    reject("Could't update reports")
                }
                resolve("Success!");
            } )
        })
        
    },
    updateReport: (week, data) =>{
        return new Promise((resolve, reject)=>{
            db.run('UPDATE reports SET text = ? WHERE week = ?;',
            data,
            week,
            (err)=>{
                if(err){
                    console.log(err);
                    reject("Could't update report table: " + err);
                }
                resolve("Success!");
            })

        })
    },
    deleteReport: () =>{
    
    },
    doesWeekReportExists: (week) =>{
        console.log("Week: "+ week);
        return new Promise((resolve, reject)=>{
            db.get("select * from reports where week = ?;",
            week,
            (err, row) => {
                if (err || row === undefined) {
                    reject("No report found, insert new one");
                }
                resolve(row);
            });
        });
    }


};

module.exports = functions;