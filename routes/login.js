"use strict";

var express = require('express');
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
    var registrationBrowser = req.query.username;
    var accessToken = req.query.username;
    var mongoose = require('mongoose');
    var db = mongoose.connection;

    db.on('error', console.error);
    mongoose.connect('mongodb://localhost:27017/tests3');
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
        console.log(1);
        var findeResult = [];
        Users.find({email: email}, function(err, users){
            if (err) {
                return console.error(err);
            } else {
                findeResult = [];
                findeResult = users;
                console.log(2, findeResult);
                if(findeResult.length == 0){
                    var users1 = new Users({
                        "firstName": firstName,
                        "lastName": lastName,
                        "registered": "Sun Dec 01 1996 02:00:00 GMT+0200 (EET)",
                        "email": email,
                        "login": login,
                        "password": password,
                        "registrationIP": registered,
                        "registrationBrowser": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.64 Safari/537.36",
                        "accessToken": "sqbkktg3s00vzz7gg3s198rzb9g3s2me2u2ng3s3"
                    });
                    console.log(users1);
                    users1.save(function (err, users) {
                        if (err) {
                            return console.error(err);
                        }
                        res.send(users);
                        console.log(users.accessToken);
                    });
                }
            }
        });
    });
});
module.exports = router;


