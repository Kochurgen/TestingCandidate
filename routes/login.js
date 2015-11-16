"use strict";

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var email = req.query.email;
    var userName = req.query.username;
    var ip = req._remoteAddress;
    var mongoose = require('mongoose');
    var db = mongoose.connection;

    db.on('error', console.error);
    mongoose.connect('mongodb://localhost:27017/tests3');
    db.once('open', function() {
        var movieSchema = new mongoose.Schema({
            name: { type: String }
            , email: String
            , ip: String
            , result: String
            , token: String
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
                        name: userName
                        , email: email
                        , ip: ip
                        , result: ''
                        , token: ''
                    });
                    users1.save(function (err, users) {
                        if (err) {
                            return console.error(err);
                        }
                        res.send(users);
                        console.log(users);
                    });
                }
            }
        });
    });
});
module.exports = router;


