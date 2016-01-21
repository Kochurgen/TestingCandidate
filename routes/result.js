"use strict";

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    try {
    var ip = req._remoteAddress;
    var mongoose = require('mongoose');
    var db = mongoose.connection;

    db.on('error', console.error);
    mongoose.connect('mongodb://anon:anon@ds037015.mongolab.com:37015/tes');
    db.once('open', function() {
        var movieSchema = new mongoose.Schema({
            "title": "result",
            "type": "object",
            "properties": {
                "userId": {
                    "type": "string"
                },
                "quizId": {
                    "type": "string"
                },
                "answers": {
                    "type": "object"
                }
            },
            "required": [
                "quizId",
                "answers"
            ]
        });
        var Users = mongoose.model('Users', movieSchema);
        var findeResult = [];
        Users.find({email: email}, function(err, users){
            if (err) {
                return console.error(err);
            } else {
                findeResult = [];
                findeResult = users;
                if(findeResult.length == 0){
                    var users1 = new Users({
                        "userId": "cwe5ty47cn8597cn4",
                        "quizId": "c9y45vc7nj489vy",
                        "answers": {
                            "c8t757y48y9j48": [1, 4],
                            "c498yu4cj598y98y7": 1,
                            "kv49cfy58u44895": [3]
                        }
                    });
                    users1.save(function (err, users) {
                        if (err) {
                            return console.error(err);
                        }
                        res.send(users);
                    });
                }
            }
        });
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

