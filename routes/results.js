"use strict";

var express = require('express');
var router = express.Router();
var ResultModel = require('./Connector').ResultModel;
var fs = require("fs");
var multiparty = require('multiparty');

/* GET users listing. */
router.get('/', function(req, res){
    "use strict";
    try{
        var email = req.headers.email||req.body.email;
        return  ResultModel.find({email:email},function(err, result) {
            if(!err) {
                var findeResult = [];
                findeResult = JSON.parse(JSON.stringify(result));
                //res.redirect('/account/testEditor');
                //res.json(findeResult);
                res.render('results.jade',{data:findeResult});
            } else {
                res.render('results.jade');
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


router.post('/', function(req, res){
    "use strict";
    try{
        console.log(req);
        var email = req.headers.email||req.body.email;
        var testName =req.headers.testName||req.body.testName;
        var questionName = req.headers.questionName||req.body.questionName;
        var answer =req.headers.answer||req.body.answer;
        console.log(testName);

        var resultModel = new ResultModel({
            "email": email,
            "testName": testName,
            "questionName":questionName,
            "answer":answer
        });
        console.log(testIndex);
        resultModel.save(function (err, users) {
            if (err) {
                res.statusCode = 500;
                res.json({
                    "identity": "account",
                    "method": "POST",
                    "version_sender": config.version_sender,
                    "version_actual": config.version_actual,
                    "data": {
                        "accessToken": null
                    },
                    "date": Date.now(),
                    "code": 500,
                    "message": "OK",
                    "status": "error",
                    "input": {
                        "email": email,
                        "testName": testName,
                        "questionName":questionName,
                        "answer":answer
                    },
                    "error": null
                });
            } else {
                res.statusCode = 201;
                res.json({
                    "identity": "account",
                    "method": "POST",
                    "version_sender": config.version_sender,
                    "version_actual": config.version_actual,
                    "data": {
                        "accessToken": null
                    },
                    "date": Date.now(),
                    "code": 201,
                    "message": "OK",
                    "status": "success",
                    "input": {
                        "email": email,
                        "testName": testName,
                        "questionName":questionName,
                        "answer":answer
                    },
                    "error": null
                });
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

