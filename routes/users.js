var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var users;
var dbUrl = require('../config.json').dbURL;

/* GET users listing. */
router.get('/', function(req, res, next) {

  MongoClient.connect(dbUrl, function(err, db){
    if(err){
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      // Get the documents collection
      var collection = db.collection('signups');
      // Get all documents
      collection.find({},{fullName: 1, email: 1, password: 1, accesToken: 1, _id: 0}).toArray(function(err, docs) {
        //{},{fullName: 1, email: 1, password: 1, accesToken: 1, _id: 0}
        users = docs;
        //res.send(docs);
        console.log('docs',docs);
        res.render('users.jade', {title: 'Express', data: docs});
      });
    }
  });
});

module.exports = router;