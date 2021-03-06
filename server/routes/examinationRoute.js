const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID

const _ = require('lodash')

var { Examination } = require('../models/examination');

app.post('/', (request, response) => {

    Examination(request.body).save().then((examination) => {
        response.send(examination);
    }, (error) => {
        response.status(400).send(error);
    })
});

app.get('/', (request, response) => {

    var query = {}

    if (request.query.examinationGroup) {
        query.examinationGroup = request.query.examinationGroup
    }

    Examination.find(query)
        .populate({ path: 'examinationGroup', select: 'name' })
        .then((examination) => {
        response.send(examination)
    }, (error) => {
        response.status(400).send(error)
    })
});

app.delete('/:id', (request, response) => {

    var id = request.params.id

    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    Examination.findByIdAndRemove(id).then((examination) => {
        if (!examination) {
            return response.status(404).send();
        }

        response.send(examinationGroup)
    }).catch((error) => {
        return response.status(400).send();
    })
})

module.exports = app;