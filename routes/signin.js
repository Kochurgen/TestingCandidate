"use strict";

var express = require('express');
var lzString = require("lz-string");
var uuid = require('node-uuid');
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send({
            "identity": "account",
            "method": "POST",
            "version_sender": "1.0.0",
            "version_actual": "1.0.0",
            "data": {
                "accessToken": "sdfgvcw7icy5e485"
            },
            "date": Date.now(),
            "code": 200,
            "message": "OK",
            "status": "success",
            "input": {
                "fullName": "fullName",
                "email": "email",
                "password": "password"
            },
            "error": "err"
        }
    );
});
router.post('/', function(req, res, next) {
        var mongoose = require('../app').mongoose;
        console.log(mongoose);
        var db = require('../app').db;
        var registred = req._startTime;
        var opts = { db: { native_parser: true }}
        db.on('error', console.error);
        //mongoose.connect('mongodb://localhost:27017/tes');
        db.once('open', function () {
            var email = req.headers.email;
            var password = req.headers.password;
            var movieSchema = new mongoose.Schema({
                "email": {"type": "string"},
                "password": {"type": "string"}
            });
            var Users = mongoose.model('Users', movieSchema);
            var findeResult = [];
            if (email != "undefined") {
                Users.find({email: email, password: password}, function (err, users) {
                    if (err) {
                        return console.error(err);
                        res.send('error');
                    } else {
                        if(users.length > 0) {
                            res.send({
                                "identity": "account",
                                "version_sender": "1.0.0",
                                "version_actual": "1.0.0",
                                "data": {
                                    "accessToken": users[0].get('accesToken')
                                },
                                "date": registred,
                                "code": 200,
                                "message": "OK",
                                "status": "succes",
                                "input": {},
                                "error": err
                            });
                        } else{
                            res.send(
                                {
                                    "identity": "account",
                                    "version_sender": "1.0.0",
                                    "version_actual": "1.0.0",
                                    "data": {
                                        "accessToken": null
                                    },
                                    "date": registred,
                                    "code": 200,
                                    "message": "OK",
                                    "status": "error",
                                    "input": {},
                                    "error": err
                                }
                            );
                        }
                    }
                });
            } else {
                res.send(
                    {
                        "identity": "account",
                        "version_sender": "1.0.0",
                        "version_actual": "1.0.0",
                        "data": {
                            "accessToken": null
                        },
                        "date": registred,
                        "code": 200,
                        "message": "OK",
                        "status": "error",
                        "input": {},
                        "error": err
                    }
                );
            }
        });
});

module.exports = router;
