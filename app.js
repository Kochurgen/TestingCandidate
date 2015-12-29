var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
//var db = require('./routes/DB');
var lzString = require("lz-string");
var uuid = require('node-uuid');
var jwt    = require('jsonwebtoken');
var routes = require('./routes/createQuestion');
var users = require('./routes/users');
var login = require('./routes/login');
var question = require('./routes/question');
var getTest = require('./routes/getTests');
var create_question = require('./routes/createQuestion');
var SignupModel = require('./routes/Connector').SignupModel;
var SigninModel= require('./routes/Connector').SigninModel;
var QuestionModel = require('./routes/Connector').QuestionModel;
var TestModel = require('./routes/Connector').TestModel;
var app = express();

//var string = "This is my compression test.";
//var compressed = LZString.compress(string);
//string = LZString.decompress(compressed);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/account/getTestlist', getTest);

app.get('/account/signup', function(req, res){
  "use strict";

  return SignupModel.find({},function(err, articles){
    console.log(articles);
    if (!err) {
      return res.render('users.jade', {title: 'Express', docs: articles});
    } else {
      res.statusCode =500;
      return res.send({error: 'Server error'});
    }
  })
});

app.post('/account/signup', function(req, res) {
  "use strict";
    var fullName = req.headers.fullName;
    var registered = Date.now();
    var email = req.headers.email;
    var password = req.headers.password;
    //var mongoose = require('mongoose');
    //var db = mongoose.connection;
    var token = {
        "fullName": fullName,
        "email": email,
        "password": password,
        registered: registered,
        "security": {
            "tokenLife": 3600
        }
    };
    var result = lzString.compress(token);
    var accessToken = uuid.v1(result);
  return SignupModel.find({email:req.headers.email}, function(err, users){
      console.log(users);
    if (err) {
      return console.error(err);
    } else {
     var findeResult = [];
      findeResult = users;
      if (findeResult.length == 0) {
        var signupModel = new SignupModel({
              "fullName": fullName,
              "email": email,
              "password": password,
              "accesToken": accessToken

            });
          signupModel.save(function (err, users) {
          if (err) {
            return console.error(err);
          } else {
            var id = users._id;
              res.statusCode = 201;
            res.json({
                  "identity": "account",
                  "method": "POST",
                  "version_sender": "1.0.0",
                  "version_actual": "1.0.0",
                  "data": {
                    "accessToken": accessToken
                  },
                  "date": registered,
                  "code": 201,
                  "message": "OK",
                  "status": "success",
                  "input": {
                    "fullName": fullName,
                    "email": email,
                    "password": password
                  },
                  "error": err
                });
          }
        });
      } else {
          res.json({
              "identity": "account",
              "method": "POST",
              "version_sender": "1.0.0",
              "version_actual": "1.0.0",
              "data": {
                  "accessToken": accessToken
              },
              "date": registered,
              "code": 201,
              "message": "OK",
              "status": "success",
              "input": {
                  "fullName": fullName,
                  "email": email,
                  "password": password
              },
              "error": err
          });
      }
    }
  });
});

app.get('/account/signin', function(req, res){
    "use strict";
    return Signup.find(function(err, articles){
        console.log(articles);
        if (!err) {
            return res.send(articles);
        } else {
            res.statusCode =500;
            return res.send({error: 'Server error'});
        }
    })
});

app.post('/account/signin', function(req, res){
    "use strict";
    var registered = Date.now();
    var email = req.headers.email;
    var password = req.headers.password;
    return SignupModel.find({email:email, password: password}, function(err, users){
        if (err) {
            return console.error(err);
        } else {
            console.log('users',users);
            if(users.length > 0) {
                var accessToken;
                console.log('users',users[0].get('accesToken'));
                if (users[0].get('accesToken') == 0){
                    var token = {
                        "fullName": fullName,
                        "email": email,
                        "password": password,
                        registered: registered,
                        "security": {
                            "tokenLife": 3600
                        }
                    };
                    var result = lzString.compress(token);
                    accessToken = uuid.v1(result);
                }else {
                    accessToken = users[0].get('accesToken');
                }
                res.statusCode = 200;
                res.send({
                    "identity": "account",
                    "version_sender": "1.0.0",
                    "version_actual": "1.0.0",
                    "data": {
                        "accessToken": accessToken
                    },
                    "date": registered,
                    "code": 200,
                    "message": "OK",
                    "status": "succes",
                    "input": {},
                    "error": err
                });
            } else{
                res.send(
                    {
                        "identity": "account",
                        "version_sender": "1.0.0",
                        "version_actual": "1.0.0",
                        "data": {
                            "accessToken": null
                        },
                        "date": registered,
                        "code": 200,
                        "message": "OK",
                        "status": "error",
                        "input": {},
                        "error": err
                    }
                );
            }
        }
    });
});

app.get('/account/question', function(req, res){
    "use strict";
    var testId = req.headers.testId;
    var curentNumber = req.headers.curentNumber;
    console.log(testId);
    if(testId != undefined) {
        return res.json(result[0]);
    } else {
        return res.send({
            "identity": "account",
            "method": "POST",
            "version_sender": "1.0.0",
            "version_actual": "1.0.0",
            "data": {
                "accessToken": accessToken
            },
            "date": registered,
            "code": 200,
            "message": "OK",
            "status": "error",
            "input": {}
            });
    }

});

app.post('/account/question', function(req, res){
    "use strict";
    var testId = req.headers.testId;
    var curentNumber = req.headers.curentNumber;
    questionModel.find({testId:testId, curentNumber:curentNumber}, function(err, result){
        if(!err){
            return res.json(result[0]);
        } else {
            return res.send(err)
        }
    });
});

app.get('/account/addQuestion', function(req, res){
    "use strict";
    var testId = req.headers.testId;
    var curentNumber = req.headers.curentNumber;
    console.log(testId);
    if(testId != undefined) {
        return res.json(result[0]);
    } else {
        return res.send({
            "identity": "account",
            "method": "POST",
            "version_sender": "1.0.0",
            "version_actual": "1.0.0",
            "data": {
                "accessToken": accessToken
            },
            "date": registered,
            "code": 200,
            "message": "OK",
            "status": "error",
            "input": {}
        });
    }

});

app.post('/account/addQuestion', function(req, res){
    "use strict";
    var Question =new questionModel({
        "testId": {"type": "string"},
        "total": {"type": "string"},
        "current number":{"type": "string"},
        "codeName": {"type": "string"},
        "question": {"type": "string"},
        "answers": {"type": "array"},
        "answerMultiple": {"type": "boolean"},
        "answerCorrect": {"type": "array"},
        "score": {"type": "string"}
    })
    var testId = req.headers.testId;
    var curentNumber = req.headers.curentNumber;
    questionModel.find({testId:testId, curentNumber:curentNumber}, function(err, result){
        if(!err){
            return res.json(result[0]);
        } else {
            return res.send(err)
        }
    });
});

app.get('/account/addQuestion', function(req, res){
    "use strict";
    var testId = req.headers.testId;
    var curentNumber = req.headers.curentNumber;
    console.log(testId);
    if(testId != undefined) {
        return res.json(result[0]);
    } else {
        return res.send({
            "identity": "account",
            "method": "POST",
            "version_sender": "1.0.0",
            "version_actual": "1.0.0",
            "data": {
                "accessToken": accessToken
            },
            "date": registered,
            "code": 200,
            "message": "OK",
            "status": "error",
            "input": {}
        });
    }

});

app.post('/account/addQuestion', function(req, res){
    "use strict";
    var testId = req.headers.testId;
    var curentNumber = req.headers.curentNumber;
    questionModel.find({testId:testId, curentNumber:curentNumber}, function(err, result){
        if(!err){
            return res.json(result[0]);
        } else {
            return res.send(err)
        }
    });
});

app.delete('/account/delTest', function(req, res) {
    var testName = req.headers.testname;
    console.log(testName);
    TestModel.remove({testName:testName}, function(err, users) {
        if(err) res.json(err);
        res.json(users);
        console.log('Selected students was deleted');
    });
});

app.post('/account/addTest', function(req, res){
    "use strict";
    var testName = req.headers.testname;
    console.log(testName);
    var token = {
        "testName": testName,
        "security": {
            "tokenLife": 3600
        }
    };
    var result = lzString.compress(token);
    var testID = uuid.v1(result);
    var testModel = new TestModel({
        "testName": testName,
        "testIndex": testID
    });
    testModel.save(function (err, users) {
        if (err) {
            return console.error(err);
        } else {
            res.statusCode = 201;
            res.json(users);
            //    {
            //        "identity": "account",
            //        "method": "POST",
            //        "version_sender": "1.0.0",
            //        "version_actual": "1.0.0",
            //        "data": {
            //            users: users
            //        },
            //        "date": Date.now(),
            //        "code": 201,
            //        "message": "OK",
            //        "status": "success",
            //        "input": {
            //        },
            //        "error": err
            //});
        }
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

