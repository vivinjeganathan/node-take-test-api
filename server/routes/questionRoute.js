const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID

var { Question } = require('../models/question');

app.post('/', (request, response) => {

    Question(request.body).save().then((doc) => {
        response.send(doc);
    }, (error) => {
        response.status(400).send(error);
    })
});

app.get('/', (request, response) => {

    var query = {}

    if (request.query.type) {
        query.type = request.query.type
    }

    if (request.query.subject) {
        query.subject = request.query.subject
    }

    if (request.query.unit) {
        query.unit = request.query.unit
    }

    if (request.query.chapter) {
        query.chapter = request.query.chapter
    }

    Question.find(query).then((question) => {
        response.send(
            question,
        )
    }, (error) => {
        response.status(400).send(error)
    })
});

app.delete('/:id', (request, response) => {

    var id = request.params.id

    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    Question.findByIdAndRemove(id).then((question) => {
        if (!question) {
            return response.status(404).send();
        }

        response.send(question)
    }).catch((error) => {
        return response.status(400).send();
    })
})

module.exports = app;