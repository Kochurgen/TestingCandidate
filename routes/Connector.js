var mongoose    = require('mongoose');
//var log         = require('./log')(module);
var dbUrl = require("../config").mongo;
var url = dbUrl.dbURL+":"+dbUrl.port+"/"+dbUrl.dbName;
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

var Question = new mongoose.Schema({
        "testIndex": {"type": "string"},
        "total": {"type": "string"},
        "current number":{"type": "string"},
        "codeName": {"type": "string"},
        "question": {"type": "string"},
        "answers": {"type": "array"},
        "answerMultiple": {"type": "boolean"},
        "answerCorrect": {"type": "array"},
        "score": {"type": "string"}
});

var Test = new mongoose.Schema({
    "testIndex":{"type": "string"},
    "testName":{"type":"string"}
});

var QuestionModel=mongoose.model('Question', Question);
var SignupModel = mongoose.model('Signup', Signup);
var SigninModel = mongoose.model('Signin', Signin);
var TestModel = mongoose.model('Test', Test);
module.exports.SignupModel = SignupModel;
module.exports.SigninModel = SigninModel;
module.exports.QuestionModel = QuestionModel;
module.exports.TestModel = TestModel;