var express = require('express');
var router = express.Router();
//var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
//
//console.log(ip);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;

