"use strict";

var express = require('express');
var router = express.Router();

/* GET options. */
router.get('/', function (req, res) {


    var r = {
        message: 'Scenario: Findingusers When I request "GET /users" Then I get a "200" response' +
        'And scope into the "data" property' +
        'And the properties exist:' +
        '"' +
        '"fullName"' +
        '"email"' +
        '"password"' +
        '"accesToken"' +
        '"'+
        '{"fullName": {"type": "string"},' +
        '"email": {"type": "string"},' +
        '"password": {"type": "string"},' +
        '"accesToken": {"type": "string"}}' +
        'Scenario: Findingtest When I request "GET /getTestlist" Then I get a "200" response ' +
        'And scope into the "data" property ' +
        'And the properties exist: ' +
        '"' +
        '"testName"' +
        '"testIndex"' +
        '"'+
        '{"testIndex":{"type": "string"},' +
        '"testName":{"type":"string"}}' +
        'Scenario: Signup When I request "POST /account/signup" Then I get a "201" response' +
        'And scope into the "data" property ' +
        'And the properties exist:' +
        '" ' +
        '"fullName"' +
        '"email"' +
        '"password"' +
        '"'+
        '{"testIndex":{"type": "string"},' +
        '"testName":{"type":"string"}}' +
        'Scenario: Signup When I request "GET /account/signup" Then I get a "400" response' +
        'And scope into the "data" property ' +
        'And the properties exist: ' +
        '" ' +
        '"testName"' +
        '"testIndex"' +
        '"'+
        '{"testIndex":{"type": "string"},' +
        '"testName":{"type":"string"}}' +
        'Scenario: Signin When I request "POST /account/signin" Then I get a "200" response' +
        'And scope into the "data" property ' +
        'And the properties exist:' +
        '" ' +
        '"email"'+
        '"password"'+
        '{"email":{"type": "string"},' +
        '"password":{"type":"string"}}' +
        'Scenario: Signin When I request "GET /account/signin" Then I get a "400" response ' +
        'And scope into the "data" property ' +
        'And the properties exist: ' +
        'Scenario: Signin When I request "POST /account/question " Then I get a "200" response' +
        'And scope into the "data" property ' +
        'And the properties exist:' +
        '" ' +
        '"email"'+
        '"password"'+
        '{"email":{"type": "string"},' +
        '"password":{"type":"string"}}' +
        'Scenario: Signin When I request "GET /account/question" Then I get a "400" response ' +
        'And scope into the "data" property ' +
        'And the properties exist: ' +
        'Scenario: Signin When I request "POST /account/addQuestion " Then I get a "200" response' +
        'And scope into the "data" property ' +
        'And the properties exist:' +
        '" ' +
        '"email"'+
        '"password"'+
        '{"email":{"type": "string"},' +
        '"password":{"type":"string"}}' +
        'Scenario: Signin When I request "GET /account/addQuestion" Then I get a "400" response ' +
        'And scope into the "data" property ' +
        'And the properties exist: ' +
        'Scenario: Signin When I request "POST /account/delTest " Then I get a "200" response' +
        'And scope into the "data" property ' +
        'And the properties exist:' +
        '" ' +
        '"email"'+
        '"password"'+
        '{"email":{"type": "string"},' +
        '"password":{"type":"string"}}' +
        'Scenario: Signin When I request "GET /account/delUsers" Then I get a "200" response ' +
        'And scope into the "data" property ' +
        'And the properties exist: ' +
        'Scenario: Signin When I request "POST /account/addTest " Then I get a "200" response' +
        'And scope into the "data" property ' +
        'And the properties exist:' +
        '" ' +
        '"email"'+
        '"password"'+
        '{"email":{"type": "string"},' +
        '"password":{"type":"string"}}' +
        'Scenario: Signin When I request "GET /account/addTest" Then I get a "400" response ' +
        'And scope into the "data" property ' +
        'And the properties exist: '


    };

    return res.json(r);

});
module.exports = router;


