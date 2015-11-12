var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClieant = mongodb.MongoClient;
var email;
var userName;
var ip;
var result = 0;
var url = 'mongodb://localhost:27017/TestApi';

/* GET users listing. */
router.get('/', function(req, res, next) {
    email = req.query.email;
    userName = req.query.username;
    ip = req._remoteAddress;
    var user1 = {name: userName, email: email, ip: ip, result: result};
    console.log(req.query);
    console.log(req._remoteAddress);
    console.log(user1);
    MongoClieant.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('users');
            collection.insert([user1], function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    users = result;
                    res.send(result.insertedIds[0]);
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.insertedIds[0]);
                }
                //Close connection
                db.close();
            });
        }
    });

});

module.exports = router;
