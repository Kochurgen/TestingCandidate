"use strict";

var express = require('express');
var router = express.Router();
var lzString = require("lz-string");
var uuid = require('node-uuid');
var TestModel = require('./Connector').TestModel;
var config = require('../config.json');

/* GET users listing. */
router.post('/', function (req, res) {
	"use strict";
	try {
		var testName = req.headers.testname || req.body.testname;
		console.log(testName);
		var token = {
			"testName": testName,
			"security": {
				"tokenLife": 3600
			}
		};
		var result = lzString.compress(token);
		var testIndex = uuid.v1(result);
		return TestModel.find({testname: testName}, function (err, result) {
			var findeResult = [];
			findeResult = result;
			if (findeResult.length == 0) {
				var testModel = new TestModel({
					"testName": testName,
					"testIndex": testIndex
				});
				testModel.save(function (err, users) {
					if (err) {
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
								testName: testName
							},
							"error": null
						});
					} else {
						res.statusCode = 201;
						res.json({
							"identity": "account",
							"method": "POST",
							"version_sender": config.version_sender,
							"version_actual": config.version_actual,
							"data": {
								test: users
							},
							"date": Date.now(),
							"code": 201,
							"message": "OK",
							"status": "success",
							"input": {
								"testName": testName,
								"testIndex": testIndex
							},
							"error": null
						});
					}
				});
			} else {
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
						testName: testName
					},
					"error": null
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

router.post('/admin', function (req, res) {
	"use strict";
	try {
		var testName = req.headers.testname || req.body.testName;
		var token = {
			"testName": testName,
			"security": {
				"tokenLife": 3600
			}
		};
		var result = lzString.compress(token);
		var testIndex = uuid.v1(result);
		return TestModel.find({testName: testName}, function (err, result) {
			var findeResult = [];
			findeResult = result;
			if (findeResult.length == 0) {
				var testModel = new TestModel({
					"testName": testName,
					"testIndex": testIndex
				});
				console.log(testIndex);
				testModel.save(function (err, users) {
					if (err) {
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
								testName: testName
							},
							"error": null
						});
					} else {
						res.statusCode = 201;
						res.redirect('/account/getTestlist/all');
					}
				});
			} else {
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
						testName: testName
					},
					"error": null
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
