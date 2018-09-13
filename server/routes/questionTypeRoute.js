const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID

var { QuestionType } = require('../models/questionType');

app.post('/', (request, response) => {

    QuestionType(request.body).save().then((doc) => {
        response.send(doc);
    }, (error) => {
        response.status(400).send(error);
    })
});

app.get('/', (request, response) => {
    QuestionType.find().then((doc) => {
        response.send(
            doc
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

    QuestionType.findByIdAndRemove(id).then((questionType) => {
        if (!questionType) {
            return response.status(404).send();
        }

        response.send(questionType)
    }).catch((error) => {
        return response.status(400).send();
    })
})

module.exports = app;