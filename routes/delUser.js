"use strict";

var express = require('express');
var router = express.Router();
var SignupModel = require('./Connector').SignupModel;

/* GET users listing. */
router.delete('/', function(req, res){
    try{
    var email = req.headers.email;
    SignupModel.remove({email:email}, function(err, users) {
        if(!err){
        res.statusCode = 200;
        res.json({
        "identity": "account",
            "method": "POST",
            "version_sender": "1.0.0",
            "version_actual": "1.0.0",
            "data": {
            "accessToken": accessToken
        },
        "date": Date.now(),
            "code": 200,
            "message": "OK",
            "status": "success",
            "input": {
            email: email
        },
        "error": null
        });
        } else {
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