var mongoose    = require('mongoose');
//var log         = require('./log')(module);
mongoose.connect('mongodb://localhost:27017/tes');
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
        "testId": {"type": "string"},
        "total": {"type": "string"},
        "current number":{"type": "string"},
        "codeName": {"type": "string"},
        "question": {"type": "string"},
        "answers": {"type": "array"},
        "answerMultiple": {"type": "boolean"},
        "answerCorrect": {"type": "array"},
        "score": {"type": "string"}
});
var QuestionModel=mongoose.model('Question', Question);
var SignupModel = mongoose.model('Signup', Signup);
var SigninModel = mongoose.model('Signin', Signin);
module.exports.SignupModel = SignupModel;
module.exports.SigninModel = SigninModel;
module.exports.QuestionModel = QuestionModel;