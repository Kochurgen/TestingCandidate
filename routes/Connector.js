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

var SignupModel = mongoose.model('Signup', Signup);
var SigninModel = mongoose.model('Signin', Signin);
module.exports.SignupModel = SignupModel;
module.exports.SigninModel = SigninModel;