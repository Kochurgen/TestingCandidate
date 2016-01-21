"use strict";

var express = require('express');
var router = express.Router();
var QuestionModel = require('./Connector').QuestionModel;
var config = require('../config.json');

/* GET users listing. */
router.get('/', function(req, res){
    console.log(req);
    try{
        var testName = req.headers.testName||req.query.testName||req.body.testName;
        var saveOptions = req.headers.saveOptions||req.query.saveOptions||req.body.saveOptions;
        console.log(saveOptions, testName)
        QuestionModel.remove({testName:testName}, function(err, users) {
            if(!err) {
                res.statusCode = 200;
                if (saveOptions=="admin") {
                    return res.redirect('/account/getTestlist/all');
                } else{
                    return res.json({
                        "identity": "account",
                        "method": "GET",
                        "version_sender": config.version_sender,
                        "version_actual": config.version_actual,
                        "data": {
                            "accessToken": null
                        },
                        "date": Date.now(),
                        "code": 200,
                        "message": "OK",
                        "status": "success",
                        "input": {
                            testName: testName
                        },
                        "error": null
                    });
                }
            } else {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
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