"use strict";

var express = require('express');
var lzString = require("lz-string");
var uuid = require('node-uuid');
var router = express.Router();
var SignupModel = require('./Connector').SignupModel;
var config = require('../config.json');

/* GET options. */
router.get('/', function(req, res){
    "use strict";
try {
    return SignupModel.find({}, function (err, articles) {
        if (!err) {
            res.statusCode = 400;
            return res.json({
                "identity": "account",
                "method": "GET",
                "version_sender": config.version_sender,
                "version_actual": config.version_actual,
                "data": {
                    "accessToken": null
                },
                "date": Date.now(),
                "code": 400,
                "message": "OK",
                "status": "success",
                "input": {
                    "fullName": '',
                    "email": '',
                    "password": ''
                },
                "error": err
            });

        } else {
            res.statusCode = 500;
            return res.send({error: 'Server error'});
        }
    })
} catch (err) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
}
});

/* Post new user. */
router.post('/', function(req, res) {
    "use strict";
    try {
    var fullName = req.headers.fullname||req.body.fullName;
    var registered = Date.now();
    var email = req.headers.email||req.body.email;
    var password = req.headers.password||req.body.password;
    var token = {
        "fullName": fullName,
        "email": email,
        "password": password,
        "registered": registered,
        "security": {
            "tokenLife": 3600
        }
    };
    var result = lzString.compress(token);
    var accessToken = uuid.v1(result);

    return SignupModel.find({email:email}, function(err, users){
        //console.log('users',users, users.length);
        if (err) {
            return console.error(err);
        } else {
            var findeResult = [];
            findeResult = users;
            if (findeResult.length == 0) {
                var signupModel = new SignupModel({
                    "fullName": fullName,
                    "email": email,
                    "password": password,
                    "accesToken": accessToken
                });
                signupModel.save(function (err, users) {
                    if (err) {
                        return console.error(err);
                    } else {
                        //console.log('usersSave',users, users.length);
                        res.statusCode = 201;
                        return res.json({
                            "identity": "account",
                            "method": "POST",
                            "version_sender": config.version_sender,
                            "version_actual": config.version_actual,
                            "data": {
                                "accessToken": accessToken
                            },
                            "date": Date.now(),
                            "code": 201,
                            "message": "OK",
                            "status": "success",
                            "input": {
                                "fullName": fullName,
                                "email": email,
                                "password": password
                            },
                            "error": err
                        });

                    }
                });
            } else {
                res.statusCode = 400;
                return res.json({
                    "identity": "account",
                    "method": "POST",
                    "version_sender": config.version_sender,
                    "version_actual": config.version_actual,
                    "data": {
                        "accessToken": accessToken
                    },
                    "date": Date.now(),
                    "code": 400,
                    "message": "OK",
                    "status": "success",
                    "input": {
                        "fullName": fullName,
                        "email": email,
                        "password": password
                    },
                    "error": err
                });
            }
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

router.post('/admin', function(req, res) {
    "use strict";
    try {
        var fullName = req.headers.fullname||req.body.fullName;
        var registered = Date.now();
        var email = req.headers.email||req.body.email;
        var password = req.headers.password||req.body.password;
        var token = {
            "fullName": fullName,
            "email": email,
            "password": password,
            "registered": registered,
            "security": {
                "tokenLife": 3600
            }
        };
        var result = lzString.compress(token);
        var accessToken = uuid.v1(result);

        return SignupModel.find({email:email}, function(err, users){
            //console.log('users',users, users.length);
            if (err) {
                return console.error(err);
            } else {
                var findeResult = [];
                findeResult = users;
                if (findeResult.length == 0) {
                    var signupModel = new SignupModel({
                        "fullName": fullName,
                        "email": email,
                        "password": password,
                        "accesToken": accessToken
                    });
                    signupModel.save(function (err, users) {
                        if (err) {
                            return console.error(err);
                        } else {
                            //console.log('usersSave',users, users.length);
                            res.statusCode = 201;
                            res.redirect('/users/all');

                        }
                    });
                } else {
                    res.statusCode = 400;
                    return res.json({
                        "identity": "account",
                        "method": "POST",
                        "version_sender": config.version_sender,
                        "version_actual": config.version_actual,
                        "data": {
                            "accessToken": accessToken
                        },
                        "date": Date.now(),
                        "code": 400,
                        "message": "OK",
                        "status": "success",
                        "input": {
                            "fullName": fullName,
                            "email": email,
                            "password": password
                        },
                        "error": err
                    });
                }
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