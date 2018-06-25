var express = require('express');
var bodyParser = require('body-Parser');

var { mongoose } = require('./db/mongoose'); 
var { Question } = require('./models/question');
var { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/question', (request, response) => {
    var question = new Question({
        description: request.body.description
    });

    question.save().then((doc) => {
        response.send(doc);
    }, (error) => {
        response.status(400).send(error);
    })
});

app.listen(3000, ()=> {
    console.log('Started on port 3000');
})