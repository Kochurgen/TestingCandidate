var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var config = require('../config.json');
var url = config.mongo.dbURl+":"+config.mongo.port+"/"+config.mogo.dbName;
var MongoClient = mongodb.MongoClient;
var users;

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

module.exports = router;
