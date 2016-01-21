"use strict";

var express = require('express');
var router = express.Router();
var questionModel = require('./Connector').QuestionModel;
var config = require('../config');

/* GET users listing. */
router.get('/:id', function (req, res) {
	"use strict";
	try {
		var testName = req.headers.testName;
		var curentNumber = req.headers.curentNumber;
		var total;
		questionModel.find({}, function (err, result) {
			total = result.length;
		});
		questionModel.find({testName: testName, curentNumber: curentNumber}, function (err, result, index) {
			if (!err) {
				res.statusCode = 200;
				return res.json({
					data: {
						"identity": "account",
						"method": "GET",
						"version_sender": config.version_sender,
						"version_actual": config.version_actual,
						"data": {
							"accessToken": null
						},
						"date": Date.now(),
						"code": 200,
						"message": "OK",
						"status": "error",
						"input": {
							testIndex: testName,
							curentNumber: curentNumber
						}
					},
					"pagination": {
						"total": total,
						"count": curentNumber,
						"next_url": "https://api.example.com/places?testIndex=" + testName + "&question=" + curentNumber++
					}
				});
			} else {
				return res.send(err)
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

