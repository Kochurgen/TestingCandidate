"use strict";

var express = require('express');
var lzString = require("lz-string");
var uuid = require('node-uuid');
var router = express.Router();
var SignupModel = require('./Connector').SignupModel;

router.get("/", function(req, res){
    "use strict";
    return SignupModel.find({}, function(err, articles){
        if (!err) {
            res.statusCode = 400;
            res.send({
                "identity": "account",
                "method": "POST",
                "version_sender": "1.0.0",
                "version_actual": "1.0.0",
                "data": {
                    "accessToken": "sdfgvcw7icy5e485"
                },
                "date": Date.now(),
                "code": 400,
                "message": "OK",
                "status": "success",
                "input": {
                    "email": '',
                    "password": ''
                },
                "error": 'err'
            });
        } else {
            res.statusCode =500;
            return res.send({error: 'Server error'});
        }
    })
});
router.post('/', function(req, res){
    "use strict";
    var registered = Date.now();
    var email = req.headers.email;
    var password = req.headers.password;
    return SignupModel.find({email:email, password: password}, function(err, users){
        if (err) {
            return console.error(err);
        } else {
            console.log('users',users);
            if(users.length > 0) {
                var accessToken;
                console.log('users',users[0].get('accesToken'));
                if (users[0].get('accesToken') == 0){
                    var token = {
                        "email": email,
                        "password": password,
                        "registered": registered,
                        "security": {
                            "tokenLife": 3600
                        }
                    };
                    var result = lzString.compress(token);
                    accessToken = uuid.v1(result);
                }else {
                    accessToken = users[0].get('accesToken');
                }
                res.statusCode = 200;
                res.json({
                    "identity": "account",
                    "version_sender": "1.0.0",
                    "version_actual": "1.0.0",
                    "data": {
                        "accessToken": accessToken
                    },
                    "date": registered,
                    "code": 200,
                    "message": "OK",
                    "status": "succes",
                    "input": {
                        "email": email,
                        "password": password
                    },
                    "error": err
                });
            } else{
                res.statusCode = 400;
                res.json(
                    {
                        "identity": "account",
                        "version_sender": "1.0.0",
                        "version_actual": "1.0.0",
                        "data": {
                            "accessToken": null
                        },
                        "date": registered,
                        "code": 400,
                        "message": "OK",
                        "status": "error",
                        "input": {
                            "email": '',
                            "password": ''
                        },
                        "error": err
                    }
                );
            }
        }
    });
});

module.exports = router;
