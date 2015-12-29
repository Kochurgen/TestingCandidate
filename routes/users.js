var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var users;
var url = 'mongodb://localhost:27017/tes';

/* GET users listing. */
router.get('/', function(req, res, next) {

  MongoClient.connect(url, function(err, db){
    if(err){
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      // Get the documents collection
      var collection = db.collection('users');
      // Get all documents
      collection.find({},{email: 1, password: 1, _id: 0}).toArray(function(err, docs) {
        users = docs;
        //res.send(docs);
        res.render('users.jade', {title: 'Express', docs: docs});
      });
    }
  });
});

module.exports = router;
