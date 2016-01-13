"use strict";

var express = require('express');
var router = express.Router();
var SignupModel = require('./Connector').SignupModel;
var config = require('../config.json');

/* GET users listing. */
router.get('/', function(req, res){
    try{
        var email = req.headers.email||req.query.email;
        SignupModel.remove({email:email}, function(err, users) {
            if(!err){
                res.statusCode = 200;
                SignupModel.find({},function (err, docs) {
                    res.redirect('/users/all');

                });
            } else {
                res.statusCode = 500;
                res.json({
                    "identity": "account",
                    "method": "GET",
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

router.delete('/', function(req, res){
    try{
    var email = req.headers.email||req.body.email;
    SignupModel.remove({email:email}, function(err, users) {
        if(!err){
        res.statusCode = 200;
        res.json({
        "identity": "account",
            "method": "DELETE",
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
            email: email
        },
        "error": null
        });
        } else {
            res.statusCode = 500;
            res.json({
                "identity": "account",
                "method": "DELETE",
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