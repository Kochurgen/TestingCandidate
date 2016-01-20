"use strict";

var express = require('express');
var router = express.Router();
var QuestionModel = require('./Connector').QuestionModel;
var fs = require("fs");
var multiparty = require('multiparty');

/* GET users listing. */
router.get('/', function (req, res) {
	"use strict";
	try {
		var testName = req.headers.data || req.body.name;
		console.log(testName);
		return QuestionModel.find({testName: testName}, function (err, result) {
			if (!err) {
				var findeResult = [];
				findeResult = JSON.parse(JSON.stringify(result));
				//res.redirect('/account/testEditor');
				//res.json(findeResult);
				res.render('testEditor.jade', {data: findeResult});
			} else {
				res.render('testEditor.jade');
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


router.post('/', function (req, res) {
	"use strict";
	try {
		console.log(req);
		var testName = req.headers.testName || req.body.testName || req.body.name;
		console.log(testName);
		return QuestionModel.find({testName: testName}, function (err, result) {
			var findeResult = [];
			findeResult = JSON.parse(JSON.stringify(result));
			console.log(findeResult);
			res.render('testEditor.jade', {data: findeResult});
			//res.redirect('/account/testEditor');
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
