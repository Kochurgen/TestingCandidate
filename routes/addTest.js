"use strict";

var express = require('express');
var router = express.Router();
var TestModel = require('./Connector').TestModel;

/* GET users listing. */
router.delete('/', function(req, res){
    "use strict";
    var testName = req.headers.testname;
    console.log(testName);
    var token = {
        "testName": testName,
        "security": {
            "tokenLife": 3600
        }
    };
    var result = lzString.compress(token);
    var testID = uuid.v1(result);
    var testModel = new TestModel({
        "testName": testName,
        "testIndex": testID
    });
    testModel.save(function (err, users) {
        if (err) {
            res.statusCode = 500;
            res.json({
                "identity": "account",
                "method": "POST",
                "version_sender": "1.0.0",
                "version_actual": "1.0.0",
                "data": {
                    "accessToken": accessToken
                },
                "date": Date.now(),
                "code": 500,
                "message": "OK",
                "status": "success",
                "input": {
                    email: email
                },
                "error": null
            });
        } else {
            res.statusCode = 201;
            res.json({
                    "identity": "account",
                    "method": "POST",
                    "version_sender": "1.0.0",
                    "version_actual": "1.0.0",
                    "data": {
                        users: users
                    },
                    "date": Date.now(),
                    "code": 201,
                    "message": "OK",
                    "status": "success",
                    "input": {
                        "testName": testName,
                        "testIndex": testID
                    },
                    "error": null
            });
        }
    });
});

module.exports = router;
