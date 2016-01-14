var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//var log         = require('./log')(module);
var config = require("../config");
var url = '';
var db = null;
if (!config.mongolab) {
	url = config.mongo.dbURl + ":" + config.mongo.port + "/" + config.mongo.dbName;
	mongoose.connect(url);
	db = mongoose.connection;
	db.on('error', new Function);
	db.once('open', new Function);
} else {
	mongoose.connect(config.mongolab.url, config.mongolab.options);
	db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', new Function);
}

var Signup = new mongoose.Schema({
	"fullName": {"type": "string"},
	"email": {"type": "string"},
	"password": {"type": "string"},
	"accesToken": {"type": "string"}
});

var Signin = new mongoose.Schema({
	"email": {"type": "string"},
	"password": {"type": "string"}
});

///** @version 1 */
//var Question = new mongoose.Schema({
//    "image": {"type": "string"},
//    "testName": {"type": "string"},
//    "total": {"type": "string"},
//    "current number": {"type": "string"},
//    "codeName": {"type": "string"},
//    "question": {"type": "string"},
//    "answers": {"type": "array"},
//    "answerMultiple": {"type": "boolean"},
//    "answerCorrect": {"type": "array"},
//    "score": {"type": "string"}
//});

/** @version 2 */
var Question = new mongoose.Schema({
	"answerCorrect": {"type": "array"},
	"answerMultiple": {"type": "boolean"},
	"answers": {"type": "array"},
	"image": {"type": "string"},
	"points": {"type": "string"},
	"question": {"type": "string"},
	"testName": {"type": "string"},
});

var Result = new mongoose.Schema({
	"email": {"type": "string"},
	"testName": {"type": "string"},
	"questionName": {"type": "string"},
	"answer": {"type": "boolean"}
});

var Test = new mongoose.Schema({
	"testIndex": {"type": "string"},
	"testName": {"type": "string"}
});

//----------------------------------------------------------------------------------------------------------------------
var NormalModel = {};
NormalModel.modelToApi = function (models, schema) {
	var filter = {id: '_id'};
	if (Array.isArray(schema)) {
		schema.forEach(function (value) {
			filter[value] = value;
		});
	} else {
		Object.assign(filter, schema);
	}
	return models.map(function (model) {
		return NormalModel.pick(model, filter)
	});
};
NormalModel.modelSchemaAttributes = function (schema) {
	var attrs = Object.keys(schema.schema.paths);
	delete attrs[attrs.indexOf('_id')];
	delete attrs[attrs.indexOf('__v')];
	return attrs.filter(function (value) {
		return value != undefined;
	});
};
NormalModel.pick = function (object, select) {
	var newObj = {};
	var type = typeof select;
	if (!object || typeof object !== 'object') {
		return {};
	}
	if (['string', 'object', 'number'].indexOf(type) < 0 || select === null) {
		return {};
	}
	if (type === 'string' || type === 'number') {
		newObj[select] = select in object ? object[select] : undefined;
		return newObj;
	}
	if (Array.isArray(select)) {
		if (!select.length) {
			return {};
		}
		select.forEach(function (property) {
			newObj[property] = property in object ? object[property] : undefined;
		});
		return newObj;
	}
	if (!Object.keys(select).length) {
		return {};
	}
	for (var property in select) {
		newObj[property] = select[property] in object ? object[select[property]] : undefined;
	}
	return newObj;
};
NormalModel.toObject = function (theModel, models) {
	return NormalModel.modelToApi(models, NormalModel.modelSchemaAttributes(theModel));
};
//----------------------------------------------------------------------------------------------------------------------
var ResultModel = mongoose.model('result', Result);
var QuestionModel = mongoose.model('Question', Question);
var SignupModel = mongoose.model('Signup', Signup);
var SigninModel = mongoose.model('Signin', Signin);
var TestModel = mongoose.model('Test', Test);
module.exports.SignupModel = SignupModel;
module.exports.SigninModel = SigninModel;
module.exports.QuestionModel = QuestionModel;
module.exports.TestModel = TestModel;
module.exports.ResultModel = ResultModel;
module.exports.NormalModel = NormalModel;