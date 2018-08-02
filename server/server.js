var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose'); 
var { Question } = require('./models/question');
var { User } = require('./models/user');

const port = process.env.PORT || 3000;

var cors = require('cors')
var app = express();
app.use(cors())

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

app.get('/question', (request, response) => {
    Question.find().then((question) => {
        response.send({
            question,
        })
    }, (error) => {
        response.status(400).send(error)
    })
});

app.listen(port, ()=> {
    console.log(`Started on port ${port}`);
})