var express = require('express'),
    router = express.Router(),
    fs = require("fs"),
    multiparty = require('multiparty');
var mongodb = require('mongodb');
var config = require('../config.json');
var url = config.mongo.dbURl+":"+config.mongo.port+"/"+config.mongo.dbName;
var MongoClient = mongodb.MongoClient;
var users;
var QuestionModel = require('./Connector').QuestionModel;

/* GET users listing. */
router.get('/', function(req, res, next) {
    try{
        MongoClient.connect(url, function(err, db){
            if(err){
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                // Get the documents collection
                var collection = db.collection('tests');
                // Get all documents
                collection.find({},{testName: 1, testIndex: 1, _id: 0}).toArray(function(err, docs) {
                    users = docs;
                    //res.send(docs);
                    res.statusCode =200;
                    res.render('createQuestion.jade',{ title: 'Node.js File Uploads', data: docs});
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

router.post('/', function(req, res, next) {
    ///** @version 1 */
    //var save = {
    //    "image": req.body.picture,
    //    "testName": req.body.TestName,
    //    "total": 0,
    //    "current number":0,
    //    "codeName": 0,
    //    "question": req.body.question,
    //    "answers": req.body.answer,
    //    "answerMultiple": true,
    //    "answerCorrect": req.body.correctAnswer,
    //    "score": 0
    //};
    var post = req.body;
    post.answerCorrect = [];
    Object
        .keys(post)
        .filter(value => value.startsWith("correctAnswer_"))
        .forEach(function (value) {
            this.push(value.substring(14) | 0);
            delete post[value];
        }, post.answerCorrect);
    /** @version 2 */
    var save = {
        "answerCorrect":  post["correctAnswer"],
        "answerMultiple": (post["answerMultiple"] === "on"),
        "answers":        post["answer"],
        "image":          post["image"] || undefined,
        "points":         1,
        "question":       post["question"],
        "testName":       post["TestName"],
    };
    var questionModel = new QuestionModel(save);
    questionModel.save(function (err, users) {
        if (err) {
            console.log(err);
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
//var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
//
//console.log(ip);