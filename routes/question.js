"use strict";

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var ip = req._remoteAddress;
    var mongoose = require('mongoose');
    var db = mongoose.connection;

    db.on('error', console.error);
    mongoose.connect('mongodb://localhost:27017/tests4');
    db.once('open', function() {
        var movieSchema = new mongoose.Schema({
            "title": "string",
            "type": "object",
            "properties": {
                "total": "string",
                "current number": "string",
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
                    "type": "string"
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
        var Question = mongoose.model('Question', movieSchema);
        var users1 = new Question({
            "title": "string",
            "type": "object",
            "properties": {
                "total": "32",
                "current number": "1",
                "codeName": "HMAC234MD",
                "question": "Qustion text",
                "answers": [
                    "1). answer correct",
                    "2). answer wrong",
                    "3). answer wrong",
                    "4). answer correct"
                ],
                "answerMultiple": true,
                "answerCorrect": ["1", "4"],
                "score": "5"
            },
            "required": [
                "codeName",
                "answers",
                "answerMultiple",
                "answerCorrect",
                "score"
            ]
        });
        console.log(users1);
        res.send(users1);
    });
});
module.exports = router;

