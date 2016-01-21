var express = require('express'),
    router = express.Router(),
    fs = require("fs"),
    multiparty = require('multiparty');
var mongodb = require('mongodb');
var config = require('../config.json');
var QuestionModel = require('./Connector').QuestionModel;
var TestModel = require('./Connector').TestModel;

/* GET users listing. */
router.get('/', function (req, res) {
    TestModel
        .find({})
        .exec()
        .then((docs) => {
            res.statusCode = 200;
            res.render('createQuestion.jade', {title: 'Node.js File Uploads', data: docs});
        })
        .catch((error) => {
            res.status(error.status || 500);
            res.render('error', {
                message: error.message,
                error: error
            });
        });
});

router.post('/', function(req, res, next) {
    var post = req.body;
    if (post.json) {
        save = JSON.parse(post.json);
    } else {
        post.answerCorrect = [];
        Object
            .keys(post)
            .filter(value => value.startsWith("correctAnswer_"))
            .forEach(function (value) {
                this.push(value.substring(14) | 0);
                delete post[value];
            }, post.answerCorrect);
        var save = {
            "answerCorrect":  post["correctAnswer"],
            "answerMultiple": (post["answerMultiple"] === "on"),
            "answers":        post["answer"],
            "image":          post["image"] || undefined,
            "points":         1,
            "question":       post["question"],
            "testName":       post["TestName"]
        };
    }
    var questionModel = new QuestionModel(save);
    questionModel.save(function (err, users) {
        if (err) {
            res.statusCode = 500;
            res.json({
                "identity": "account",
                "method": "POST",
                "version_sender": config.version_sender,
                "version_actual": config.version_actual,
                "data": {
                    "accessToken": null
                },
                "date": Date.now(),
                "code": 500,
                "message": "OK",
                "status": "success",
                "input": {
                    testName: req.body.TestName
                },
                "error": null
            });
        } else {
            res.statusCode = 201;
            res.redirect('/account/createQuestion');
        }
    });
});

module.exports = router;