var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("./db/texts.sqlite");

var fn = require('../functions');




router.get('/:week', (req, res, next) => {
    var selectQuery = "select * from reports where week = ?";
    db.get(selectQuery, req.params.week , (err, row) => {
            if (err) {
                console.log("Something went wrong: " + err);
                res.json({
                    "message": "Failed",
                    "error": err
                
                });
            }
            console.log(row);
            res.json({
                "message": "Success1",
                "data": row
            })
        });
});

router.post("/",  (req, res, next) => fn.checkToken(req, res, next),(req, res, next)=> {

    fn.doesWeekReportExists(req.body.kmom)
    .then((result)=>{
        fn.updateReport(req.body.kmom, req.body.data)
            .then((result)=>{
                res.status(201).json({
                    data: {
                        status: "ok",
                        msg: "Got a POST request, sending back 201 Update"
                    }
                });
            }).catch((e)=>{
                res.status(500).json({
                    data: {
                        msg: "Failed somehow" + e
                    }
                });
        })
    })
    .catch((res)=>{
    
        fn.createNewreport(req.body.kmom, req.body.data)
        
            .then((result)=>{
            
                res.status(201).json({
                    data: {
                        status: "ok",
                        msg: "Got a POST request, sending back 201 Created"
                    }
                });
            }).catch((res)=>{
            
                res.status(500).json({
                    "data": [
                        {
                            "msg": err.status
                        }
                    ]
                });
            })
    })
    

});

module.exports = router;