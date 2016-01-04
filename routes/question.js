"use strict";

var express = require('express');
var router = express.Router();
var questionModel = require('./Connector').QuestionModel;

/* GET users listing. */
router.get('/', function(req, res){
    "use strict";
    var testIndex = req.headers.testIndex;
    var curentNumber = req.headers.curentNumber;
    if(testIndex != undefined) {
        res.statusCode = 400;
        return res.json({
            data: {
                "identity": "account",
                "method": "POST",
                "version_sender": "1.0.0",
                "version_actual": "1.0.0",
                "data": {
                    "accessToken": null
                },
                "date": Date.now(),
                "code": 400,
                "message": "OK",
                "status": "error",
                "input": {
                    testIndex: '',
                    curentNumber:''
                }
            },
            "pagination" : {
                "total": 0,
                "count": 0,
                "per_page": 0,
                "current_page": 0,
                "total_pages": 0,
                "next_url": "https://api.example.com/places?page=2&number=12"
            }
        });
    } else {
        res.statusCode = 500;
        return res.json({
            "identity": "account",
            "method": "POST",
            "version_sender": "1.0.0",
            "version_actual": "1.0.0",
            "data": {
                "accessToken": null
            },
            "date": Date.now(),
            "code": 500,
            "message": "OK",
            "status": "error",
            "input": {}
        });
    }

});

router.post('/', function(req, res){
    "use strict";
    var testId = req.headers.testId;
    var curentNumber = req.headers.curentNumber;
    var total;
    questionModel.find({}, function(err, result){
        total =result.length;
    });
    questionModel.find({testId:testId, curentNumber:curentNumber}, function(err, result, index){
        console.log(result, index);
        if(!err){
            res.statusCode = 200;
            return res.json({
                data: {
                    "identity": "account",
                    "method": "POST",
                    "version_sender": "1.0.0",
                    "version_actual": "1.0.0",
                    "data": {
                        "accessToken": null
                    },
                    "date": Date.now(),
                    "code": 200,
                    "message": "OK",
                    "status": "error",
                    "input": {
                        testIndex: testId,
                        curentNumber: curentNumber
                    }
                },
                "pagination" : {
                    "total": total ,
                    "count": curentNumber ,
                    "next_url": "https://api.example.com/places?testIndex="+testId+"&question="+curentNumber++
                }
            });
        } else {
            return res.send(err)
        }
    });
});
module.exports = router;

