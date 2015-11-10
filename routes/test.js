var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('{'+
        '"name": "nodetest1",'+
        '"version": "0.0.0",'+
        '"private": true,'+
        '"scripts": {'+
        '"start": "node ./bin/www"'+
    '},'+
    '"dependencies": {'+
        '"body-parser": "~1.12.4",'+
            '"cookie-parser": "~1.3.5",'+
            '"debug": "~2.2.0",'+
            '"express": "~4.12.4",'+
            '"jade": "~1.9.2",'+
            '"morgan": "~1.5.3",'+
            '"serve-favicon": "~2.2.1"'+
    '}' +
        '}');
});

module.exports = router;
