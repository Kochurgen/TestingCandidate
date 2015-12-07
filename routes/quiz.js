"use strict";

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var ip = req._remoteAddress;
    var mongoose = require('mongoose');
    var db = mongoose.connection;

    db.on('error', console.error);
    mongoose.connect('mongodb://localhost:27017/tests3');
    db.once('open', function() {
        var movieSchema = new mongoose.Schema({
            "title": "quiz",
            "type": "object",
            "properties": {
                "nameOfQuiz": {
                    "type": "string"
                },
                "questions": {
                    "type": "array"
                }
            },
            "required": [
                "nameOfQuiz",
                "questions"
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
                        "nameOfQuiz": "Name of Quiz",
                        "questions": [
                            "id1",
                            "id2",
                            "id3"
                        ]
                    });

                    res.send(users1);
                    console.log(users);
                }
            }
        });
    });
});
module.exports = router;
