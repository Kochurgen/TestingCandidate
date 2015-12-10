var express = require('express');
var router = express.Router();
//var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
//
//console.log(ip);

/* GET home page. */
router.get('/', function(req, res, next) {
        var codeName = req.query.codeName;
        var question = req.query.question;
        var answers =[
                      "1). answer correct",
                      "2). answer wrong",
                      "3). answer wrong",
                      "4). answer correct"
        ];
        var answerMultiple = true;
        var answerCorrect = ["1", "4"];
        var score = 5;

  db.on('error', console.error);
  mongoose.connect('mongodb://localhost:27017/tests4');
  db.once('open', function() {
    var movieSchema = new mongoose.Schema({
      "title": "string",
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "registered": {
          "type": "date"
        },
        "email": {
          "type": "string"
        },
        "login": {
          "type": "string"
        },
        "password": {
          "type": "string"
        },
        "registrationIP": {
          "type": "string"
        },
        "registrationBrowser": {
          "type": "string"
        },
        "accessToken": {
          "type": "string"
        }
      },
      "required": [
        "firstName",
        "lastName",
        "email",
        "login",
        "password"
      ]
    });
    var Users = mongoose.model('Users', movieSchema);
    var findeResult = [];
    var token = {
      "email": email,
      registered:registered,
      "security": {
        "tokenLife" : 3600
      }
    };
    var result  = lzString.compress(token);
    var accessToken = uuid.v1(result);
    Users.find({email: email}, function(err, users){
      if (err) {
        return console.error(err);
      } else {
        findeResult = [];
        findeResult = users;
        console.log(users);
        if(findeResult.length == 0){
          var users1 = new Users({
            "title": firstName + " " + lastName,
            "type": "object",
            "properties": {
              "firstName": firstName,
              "lastName": lastName,
              "registered": registred,
              "email": email,
              "login": login,
              "password": password,
              "registrationIP": registrationIP,
              "registrationBrowser": registrationBrowser,
              "accessToken": accessToken
            },
            "required": [
              firstName,
              lastName,
              email,
              login,
              password
            ]
          });
          users1.save(function (err, users) {
            if (err) {
              return console.error(err);
            }else {
              var id = users._id;
              res.send({accessToken, id});
            }
          });
        }
      }
    });
  });
});


module.exports = router;

