"use strict";

var express = require('express');
var lzString = require("lz-string");
var uuid = require('node-uuid');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var firstName = req.query.firstName;
    var lastName = req.query.lastName;
    var registered = req.query.registered;
    var email= req.query.email;
    var login= req.query.login;
    var password = req.query.password;
    var registrationIP = req._remoteAddress;
    var registrationBrowser = req.rawHeaders[11];
    var accessToken = req.query.username;
    var mongoose = require('mongoose');
    var db = mongoose.connection;
    var registred = req._startTime;

    db.on('error', console.error);
    mongoose.connect('mongodb://localhost:27017/tests4');
    db.once('open', function() {
        var movieSchema = new mongoose.Schema({
            "title": "string",
            "type": "object",
            "properties": {
                "firstName": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "registered": {
                    "type": "date"
                },
                "email": {
                    "type": "string"
                },
                "login": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "registrationIP": {
                    "type": "string"
                },
                "registrationBrowser": {
                    "type": "string"
                },
                "accessToken": {
                    "type": "string"
                }
            },
            "required": [
                "firstName",
                "lastName",
                "email",
                "login",
                "password"
            ]
        });
        var Users = mongoose.model('Users', movieSchema);
        var token = {
            "email": email,
            registered:registered,
            "security": {
                "tokenLife" : 3600
            }
        };
        var result  = lzString.compress(token);
        var uuid2 = uuid.v1(result);
        var findeResult = [];
        Users.find({email: email}, function(err, users){
            if (err) {
                return console.error(err);
            } else {
                findeResult = [];
                findeResult = users;
                if(findeResult.length == 0){
                    var users1 = new Users({
                        "title": firstName + " " + lastName,
                        "type": "object",
                        "properties": {
                            "firstName": firstName,
                            "lastName": lastName,
                            "registered": registred,
                            "email": email,
                            "login": login,
                            "password": password,
                            "registrationIP": registrationIP,
                            "registrationBrowser": registrationBrowser,
                            "accessToken": uuid2
                        },
                        "required": [
                            firstName,
                            lastName,
                            email,
                            login,
                            password
                        ]
                    });
                    users1.save(function (err, users) {
                        if (err) {
                            return console.error(err);
                        }else {
                            res.send(uuid2);
                        }
                    });
                }
            }
        });
    });
});
module.exports = router;