"use strict";

var express = require('express');
var router = express.Router();
var questionModel = require('./Connector').QuestionModel;

/* GET users listing. */
router.get('/', function(req, res){
    "use strict";
    try{
    var testIndex = req.headers.testIndex;
    var curentNumber = req.headers.curentNumber;
    var total;
    questionModel.find({}, function(err, result){
        total =result.length;
    });
    questionModel.find({testIndex:testIndex, curentNumber:curentNumber}, function(err, result, index){
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
                        testIndex: testIndex,
                        curentNumber: curentNumber
                    }
                },
                "pagination" : {
                    "total": total ,
                    "count": curentNumber ,
                    "next_url": "https://api.example.com/places?testIndex="+testIndex+"&question="+curentNumber++
                }
            });
        } else {
            return res.send(err)
        }
    });
    } catch (err) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    }
});
module.exports = router;

