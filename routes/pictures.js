var express = require('express');
var router = express.Router();
var TestModel = require('./Connector').TestModel;
var config = require('../config.json');

/* GET users listing. */
router.get('/', function(req, res){
    try{
        var testName = req.headers.testname;
        TestModel.remove({testName:testName}, function(err, users) {
            if(!err) {
                return res.json({
                    "identity": "account",
                    "method": "POST",
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
            } else {
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
                    "status": "success",
                    "input": {
                        testName: testName
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
