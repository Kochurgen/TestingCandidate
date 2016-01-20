var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var config = require('../config');
var url = config.mongo.dbURl + ":" + config.mongo.port + "/" + config.mongo.dbName;
var MongoClient = mongodb.MongoClient;
var users;

/* GET users listing. */
router.get('/', function (req, res, next) {
	try {
		console.log(res);
		var accessToken = req._verefyToken;
		MongoClient.connect(url, function (err, db) {
			if (err) {
				console.log('Unable to connect to the mongoDB server. Error:', err);
			} else {
				// Get the documents collection
				var collection = db.collection('signups');
				// Get all documents
				collection.find({accessToken: accessToken}).toArray(function (err, docs) {
					users = docs;
					console.log(docs);
				});
			}
		});
		res.send(users);
	} catch (err) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	}
});

module.exports = router;
