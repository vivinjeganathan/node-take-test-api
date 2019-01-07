const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID

var { StudentBatch } = require('../models/studentBatch');

app.post('/', (request, response) => {

    StudentBatch(request.body).save().then((studentBatch) => {
        response.send(studentBatch);
    }, (error) => {
        response.status(400).send(error);
    })
});

app.get('/', (request, response) => {
    StudentBatch.find().then((studentBatch) => {
        response.send(
            studentBatch
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

    StudentBatch.findByIdAndRemove(id).then((studentBatch) => {
        if (!studentBatch) {
            return response.status(404).send();
        }

        response.send(studentBatch)
    }).catch((error) => {
        return response.status(400).send();
    })
})

module.exports = app;