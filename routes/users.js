var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var users;
var url = 'mongodb://localhost:27017/test3';

/* GET users listing. */
router.get('/', function(req, res, next) {
  //console.log(req.query);
  MongoClient.connect(url, function(err, db){
    if(err){
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      // Get the documents collection
      var collection = db.collection('users');
      // Get all documents
      collection.find().toArray(function(err, docs) {
        users = docs;
      });
    }
  });
  res.send(users);
});

module.exports = router;
