"use strict";

var express = require('express');
var router = express.Router();
var questionModel = require('./Connector').QuestionModel;

/* GET users listing. */
router.get('/', function(req, res){
    "use strict";
    try{
    questionModel.find({}, function(err, result){
    if(!err) {
        res.statusCode =400;
        return res.json({
                "identity": "account",
                "method": "POST",
                "version_sender": "1.0.0",
                "version_actual": "1.0.0",
                "data": {
                    "accessToken": null
                },
                "date": registered,
                "code": 400,
                "message": "OK",
                "status": "error",
                "input": {}
        });
    } else {
        return res.json({
                "identity": "account",
                "method": "POST",
                "version_sender": "1.0.0",
                "version_actual": "1.0.0",
                "data": {
                    "accessToken": null
                },
                "date": registered,
                "code": 500,
                "message": "OK",
                "status": "error",
                "input": {}

        });
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

router.post('/account/addQuestion', function(req, res){
    "use strict";
    try{
    var testIndex = req.headers.testIndex;
    var question = req.headers.question;
    var answerCorrect = req.headers.answerCorrect;
    var answers = req.headers.answers;
    var answerMultiple = req.headers.answerMultiple;
    var score = req.headers.score;
    var total = req.headers.total;
    var Question = new questionModel({
        "testIndex": testIndex,
        "total": total,
        "codeName": {"type": "string"},
        "question": question,
        "answers": answers,
        "answerMultiple": answerMultiple,
        "answerCorrect": answerCorrect,
        "score": score
    });
    var testIndex = req.headers.testIndex;
    var curentNumber = req.headers.curentNumber;
    questionModel.find({testIndex:testIndex, curentNumber:curentNumber}, function(err, result){
        if(!err){
            res.statusCode = 201
            return res.json({
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
                "status": "error",
                "input": {
                    "testIndex": testIndex,
                    "total": total,
                    "codeName": {"type": "string"},
                    "question": question,
                    "answers": answers,
                    "answerMultiple": answerMultiple,
                    "answerCorrect": answerCorrect,
                    "score": score
                }
            });
        } else {
            res.send({
                "identity": "account",
                "method": "POST",
                "version_sender": "1.0.0",
                "version_actual": "1.0.0",
                "data": {
                    "accessToken": accessToken
                },
                "date": registered,
                "code": 500,
                "message": "OK",
                "status": "error",
                "input": {}

            });
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