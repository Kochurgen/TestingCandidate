"use strict";

var express = require('express');
var router = express.Router();

/* GET options. */
router.get('/', function (req, res) {


    var r = {
        message: `Scenario: Findingusers When I request "GET /users" Then I get a "200" response
        And scope into the "data" property 
        And the properties exist arrey: 
        [ 0:{ 
        "fullName" 
        "email" 
        "password" 
        "accesToken" 
        }]
        "fullName": {"type": "string"},
        "email": {"type": "string"}, 
        "password": {"type": "string"}, 
        "accesToken": {"type": "string"}
        Scenario: Findingtest When I request "GET /account/getTestlist" Then I get a "200" response  
        And scope into the "data" property  
        And the properties exist arrey:  
        [0:{ 
        "testName" 
        "testIndex" 
        }]
        "testIndex":{"type": "string"},
        "testName":{"type":"string"}
        Scenario: Signup When I request "POST /account/signup" Then I get a "201" response 
        request contain data:
        "
        "fullName" 
        "email" 
        "password" 
        "
        "fullName":{"type": "string"},
        "email":{"type":"string"}
        "password":{"type":"string"}

        Scenario: Signin When I request "POST /account/signin" Then I get a "200" response 
        request contain data:
        "  
        "email"
        "password"
        "email":{"type": "string"},
        "password":{"type":"string"}
        And scope into the "data" property
        And the properties exist arrey:
        Scenario: Signin When I request "GET /account/question " Then I get a "200" response 
        request contain data:
        "  
        "testIndex"
        "curentNumber"
        "
        "testIndex":{"type": "string"},
        "curentNumber":{"type":"integer"}}
        Scenario: Signin When I request "POST /account/addQuestion " Then I get a "200" response 
        And scope into the "data" property  
        And the properties exist: 
        "  
        "testIndex"
        "total"
        "codeName"
        "question"
        "answers"
        "answerCorrect"
        "score"
            "
        "testIndex": {"type": "string"},
        "total": {"type": "string"},
        "current number":{"type": "string"},
        "codeName": {"type": "string"},
        "question": {"type": "string"},
        "answers": {"type": "array"},
        "answerMultiple": {"type": "boolean"},
        "answerCorrect": {"type": "array"},
        "score": {"type": "string"}
        Scenario: Signin When I request "DELETE /account/delTest " Then I get a "200" response
        And scope into the "data" property
        And the properties exist:

        "testName"

        "testName":{"type": "string"}

        Scenario: Signin When I request "DELETE /account/delUsers" Then I get a "200" response
        And scope into the "data" property
        And the properties exist:

        "email"

        "email":{"type":"string"}

        Scenario: Signin When I request "POST /account/addTest " Then I get a "200" response 
        And scope into the "data" property  
        And the properties exist: 
        "  
        "testName"

        "testName":{"type": "string"}
`

    };
    res.statusCode=200;
    return res.json(r);

});
module.exports = router;


