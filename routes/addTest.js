"use strict";

var express = require('express');
var router = express.Router();
var lzString = require("lz-string");
var uuid = require('node-uuid');
var TestModel = require('./Connector').TestModel;
var config = require('../config.json');

/* POST users listing. */
router.post('/', function(req, res){
    "use strict";
    try{
    var saveOptions = "";
    var testName = req.headers.testname||req.body.testName;
    var saveOptions = req.headers.saveOptions||req.body.saveOptions;
    var token = {
        "testName": testName,
        "security": {
            "tokenLife": 3600
        }
    };
    var result = lzString.compress(token);
    var testIndex = uuid.v1(result);
    return  TestModel.find({testIndex:testIndex},function(err, result) {
        if (!err) {
            var findeResult = [];
            findeResult = result;
            if (findeResult.length == 0) {
                var testModel = new TestModel({
                    "testIndex": testIndex,
                    "testName": testName
                });
                testModel.save(function (err, users) {
                    if (err) {
                        res.statusCode = 500;
                        res.status(err.status || 500);
                        res.render('error', {
                            message: err.message,
                            error: err
                        });
                    } else {
                        res.statusCode = 201;
                        if (saveOptions) {
                            res.redirect('/account/getTestlist/all');
                        } else {
                            res.json({
                                "identity": "account",
                                "method": "POST",
                                "version_sender": config.version_sender,
                                "version_actual": config.version_actual,
                                "data": {
                                    test: users
                                },
                                "date": Date.now(),
                                "code": 201,
                                "message": "OK",
                                "status": "success",
                                "input": {
                                    "testName": testName,
                                    "testIndex": testIndex
                                },
                                "error": null
                            });
                        }
                    }
                });
            } else {
                res.redirect('/account/getTestlist/all');
            }
        } else{
            res.statusCode = 500;
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
