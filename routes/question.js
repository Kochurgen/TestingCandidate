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
            "title": "question",
            "type": "object",
            "properties": {
                "codeName": {
                    "type": "string"
                },
                "question": {
                    "type": "string"
                },
                "answers": {
                    "type": "array"
                },
                "answerMultiple": {
                    "type": "boolean"
                },
                "answerCorrect": {
                    "type": "array"
                },
                "score": {
                    "type": "integer"
                }
            },
            "required": [
                "codeName",
                "answers",
                "answerMultiple",
                "answerCorrect",
                "score"
            ]
        });
        var Users = mongoose.model('Users', movieSchema);
        console.log(1);
        var findeResult = [];
        Users.find({"codeName": codeName}, function(err, users){
            if (err) {
                return console.error(err);
            } else {
                findeResult = [];
                findeResult = users;
                console.log(2, findeResult);
                if(findeResult.length == 0){
                    var users1 = new Users({
                        "codeName": "HMAC234MD",
                        "question": "Qustion text",
                        "answers": [
                            "1). answer correct",
                            "2). answer wrong",
                            "3). answer wrong",
                            "4). answer correct"
                        ],
                        "answerMultiple": true,
                        "answerCorrect": [1, 4],
                        "score": 5
                    });
                        res.send(users1);
                        console.log(users);
                    };
            }

        });
    });
});
module.exports = router;

