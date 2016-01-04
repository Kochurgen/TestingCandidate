var express = require('express');
var nconf = require('nconf');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var question = require('./routes/question');
var getTest = require('./routes/getTests');
var signup = require('./routes/signup');
var signin = require('./routes/signin');
var addQuestion = require('./routes/addQuestion');
var delTest = require('./routes/delTest');
var addTest = require('./routes/addTest');
var delUser = require('./routes/delUser');
var SignupModel = require('./routes/Connector').SignupModel;
var TestModel = require('./routes/Connector').TestModel;
var app = express();
nconf.argv()
    .env()
    .file({ file: './config.json' });
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

app.use('/', index);

app.use('/users', users);

app.use('/account/getTestlist', getTest);

app.use('/account/signup', signup);

app.use('/account/signin', signin);

app.use('/account/question', question);

app.use('/account/addQuestion', addQuestion);

app.delete('/account/delTest', delTest);

app.post('/account/addTest', addTest);

app.delete('/account/delUsers', function(req, res) {
    var email = req.headers.email;
    console.log(email);
    SignupModel.remove({__v:email}, function(err, users) {
        if(err) res.json(err);
        res.json(users);
        console.log('Selected students was deleted');
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

