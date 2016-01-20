"use strict";

var express = require("express");
var lzString = require("lz-string");
var uuid = require("node-uuid");
var router = express.Router();
var SignupModel = require("./Connector").SignupModel;
var Rest = require("./Connector").Rest;

var identity = "account";

router.post("/", function (req, res) {
	var method = "POST";
	var email = req.headers.email;
	var password = req.headers.password;
	SignupModel
		.find({
			email: email,
			password: password
		})
		.then(function (users) {
			if (users.length < 1) {
				res.statusCode = 400;
				res.json(Rest.answer({
					"code": 400,
					"identity": identity,
					"method": method,
					"status": "error",
				}));
				return;
			}
			var accessToken = null;
			if (users[0].get("accesToken") == 0) {
				var token = {
					"email": email,
					"password": password,
					"security": {
						"tokenLife": 3600
					}
				};
				accessToken = uuid.v1(lzString.compress(token));
			} else {
				accessToken = users[0].get("accesToken");
			}
			res.statusCode = 200;
			res.json(Rest.answer({
				"data": {
					"accessToken": accessToken
				},
				"identity": identity,
				"input": {
					"email": email,
					"password": password
				},
				"method": method,
			}));
		})
		.catch(function (error) {
			res.statusCode = 500;
			res.json(Rest.answer({
				"error": error,
				"identity": identity,
				"message": error.message || error,
				"method": method,
				"status": "error",
			}));
		});
});

router.get("/", function (req, res) {
	"use strict";
	try {
		return SignupModel.find({}, function (err, articles) {
			if (!err) {
				res.statusCode = 400;
				res.send({
					"identity": "account",
					"method": "GET",
					"version_sender": config.version_sender,
					"version_actual": config.version_actual,
					"data": {
						"accessToken": "sdfgvcw7icy5e485"
					},
					"date": Date.now(),
					"code": 400,
					"message": "OK",
					"status": "success",
					"input": {
						"email": "",
						"password": ""
					},
					"error": "err"
				});
			} else {
				res.statusCode = 500;
				return res.send({error: "Server error"});
			}
		})
	} catch (err) {
		res.status(err.status || 500);
		res.render("error", {
			message: err.message,
			error: err
		});
	}
});

/*
router.put("/", function (req, res) {
	"use strict";
	try {
		var registered = Date.now();
		var email = req.headers.email;
		var password = req.headers.password;
		return SignupModel.find({email: email, password: password}, function (err, users) {
			if (err) {
				return console.error(err);
			} else {
				console.log("users", users);
				if (users.length > 0) {
					var accessToken;
					console.log("users", users[0].get("accesToken"));
					if (users[0].get("accesToken") == 0) {
						var token = {
							"email": email,
							"password": password,
							"registered": registered,
							"security": {
								"tokenLife": 3600
							}
						};
						var result = lzString.compress(token);
						accessToken = uuid.v1(result);
					} else {
						accessToken = users[0].get("accesToken");
					}
					res.statusCode = 200;
					res.json({
						"identity": "account",
						"version_sender": config.version_sender,
						"version_actual": config.version_actual,
						"data": {
							"accessToken": accessToken
						},
						"date": registered,
						"code": 200,
						"message": "OK",
						"status": "succes",
						"input": {
							"email": email,
							"password": password
						},
						"error": err
					});
				} else {
					res.statusCode = 400;
					res.json(
						{
							"identity": "account",
							"version_sender": config.version_sender,
							"version_actual": config.version_actual,
							"data": {
								"accessToken": null
							},
							"date": registered,
							"code": 400,
							"message": "OK",
							"status": "error",
							"input": {
								"email": "",
								"password": ""
							},
							"error": err
						}
					);
				}
			}
		});
	} catch (err) {
		res.status(err.status || 500);
		res.render("error", {
			message: err.message,
			error: err
		});
	}
});
*/
module.exports = router;
