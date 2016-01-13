var mongoose    = require('mongoose');
//var log         = require('./log')(module);
var config = require("../config");
var url = config.mongo.dbURl+":"+config.mongo.port+"/"+config.mongo.dbName;
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', function (err) {

});
db.once('open', function callback () {

});

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
    "answerCorrect":  {"type": "array"},
    "answerMultiple": {"type": "boolean"},
    "answers":        {"type": "array"},
    "image":          {"type": "string"},
    "points":         {"type": "string"},
    "question":       {"type": "string"},
    "testName":       {"type": "string"},
});

var Result = new mongoose.Schema({
    "email": {"type": "string"},
    "testName":{"type": "string"},
    "questionName":{"type":"string"},
    "answer":{"type":"boolean"}
});

var Test = new mongoose.Schema({
    "testIndex":{"type": "string"},
    "testName":{"type":"string"}
});

var ResultModel = mongoose.model('result',Result);
var QuestionModel=mongoose.model('Question', Question);
var SignupModel = mongoose.model('Signup', Signup);
var SigninModel = mongoose.model('Signin', Signin);
var TestModel = mongoose.model('Test', Test);
module.exports.SignupModel = SignupModel;
module.exports.SigninModel = SigninModel;
module.exports.QuestionModel = QuestionModel;
module.exports.TestModel = TestModel;
module .exports.ResultModel = ResultModel;