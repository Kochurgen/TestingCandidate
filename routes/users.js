var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var users;
var dbUrl = require('../config.json').mongo;
var url = dbUrl.dbURL+":"+dbUrl.port+"/"+dbUrl.dbName;
/* GET users listing. */
router.get('/', function(req, res, next) {
try {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      // Get the documents collection
      var collection = db.collection('signups');
      // Get all documents
      collection.find({}, {fullName: 1, email: 1, password: 1, accesToken: 1, _id: 0}).toArray(function (err, docs) {
        //{},{fullName: 1, email: 1, password: 1, accesToken: 1, _id: 0}
        users = docs;
        //res.send(docs);
        console.log('docs', docs);
        res.statusCode = 200;
        res.json({
            "method": "POST",
            "version_sender": "1.0.0",
            "version_actual": "1.0.0",
            "data": docs,
        "date": Date.now(),
            "code": 200,
            "message": "OK",
            "status": "success",
            "input": {
            },
        "error": null
        });
        //res.render('users.jade', {title: 'Express', data: docs});
      });
    }
  });
} catch (err){
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
}
});

module.exports = router;