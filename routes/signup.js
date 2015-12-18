
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
            "error": "error"
        }
    );
});
router.post("/", function (req, res, next) {
    console.log(req.headers.email);
    var fullName = req.headers.fullName;
    var registered = Date.now();
    var email = req.headers.email;
    var password = req.headers.password;
    var mongoose = require('mongoose');
    var db = mongoose.connection;
    var registred = req._startTime;
    db.on('error', console.error);
    mongoose.connect('mongodb://localhost:27017/tes');
    db.once('open', function () {
        var movieSchema = new mongoose.Schema({
            "fullName": {"type": "string"},
            "email": {"type": "string"},
            "password": {"type": "string"},
            "accesToken": {"type": "string"}
        });

        var Users = mongoose.model('Users', movieSchema);
        var findeResult = [];
        var token = {
            "fullName": fullName,
            "email": email,
            "password": password,
            registered: registered,
            "security": {
                "tokenLife": 3600
            }
        };
        var result = lzString.compress(token);
        var accessToken = uuid.v1(result);
        Users.find({email: email}, function (err, users) {
            if (err) {
                return console.error(err);
            } else {
                findeResult = [];
                findeResult = users;
                console.log(users);
                if (findeResult.length == 0) {
                    var users1 = new Users(
                        {
                            "fullName": fullName,
                            "email": email,
                            "password": password,
                            "accesToken": accessToken

                        });
                    users1.save(function (err, users) {
                        if (err) {
                            return console.error(err);
                        } else {
                            var id = users._id;
                            res.send({
                                    "identity": "account",
                                    "method": "POST",
                                    "version_sender": "1.0.0",
                                    "version_actual": "1.0.0",
                                    "data": {
                                        "accessToken": accessToken
                                    },
                                    "date": registered,
                                    "code": 201,
                                    "message": "OK",
                                    "status": "success",
                                    "input": {
                                        "fullName": fullName,
                                        "email": email,
                                        "password": password
                                    },
                                    "error": err
                                }
                            );
                        }
                    });
                }
            }
        });
    });

});

module.exports = router;