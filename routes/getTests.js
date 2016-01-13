var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var config = require('../config.json');
var url = config.mongo.dbURl+":"+config.mongo.port+"/"+config.mongo.dbName;
var MongoClient = mongodb.MongoClient;
var QuestionModel = require('./Connector').QuestionModel;
var users;

/* GET users listing. */
router.get('/', function(req, res, next) {
try{
    MongoClient.connect(url, function(err, db){
        if(err){
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //res.render('testEditor.jade',{data:req.headers.name});
             //Get the documents collection
            var collection = db.collection('tests');
            // Get all documents
            collection.find({},{testName: 1, testIndex: 1, _id: 0}).toArray(function(err, docs) {
                users = docs;
                //res.send(docs);
                res.statusCode =200;
                res.json({ data: docs});
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

router.get('/all', function(req, res, next) {
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
                    res.render('tests.jade',{ data: docs});
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
    try{
        res.redirect('/account/testEditor')
    } catch (err) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    }
});

router.get('/edit', function(req, res, next){
    "use strict";
    try{

        var testName = req.headers.name||req.body.name||req.query.name;
        console.log(testName);
        return  QuestionModel.find({testName:testName},function(err, result) {
            if(!err) {
                var findeResult = [];
                //findeResult = JSON.parse(JSON.stringify(result));
                //res.redirect('/account/testEditor');
                //res.send(findeResult);
                //res.render('users.jade',{data: findeResult})
            } else {
                res.send('err')
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
