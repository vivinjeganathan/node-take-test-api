const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID

const _ = require('lodash')

var { TestCategory } = require('../models/testCategory');

app.post('/', (request, response) => {

    TestCategory(request.body).save().then((examinationGroup) => {
        response.send(examinationGroup);
    }, (error) => {
        response.status(400).send(error);
    })
});

app.get('/', (request, response) => {

    var query = {}

    if (request.query.examinationGroup) {
        query.examinationGroup = request.query.examinationGroup
    }
    if (request.query.examination) {
        query.examination = request.query.examination
    }

    TestCategory.find(query)
        .populate({ path: 'examination', select: 'name' })
        .populate({ path: 'examinationGroup', select: 'name' })
        .populate({ path: 'subjects.subject', select: 'name' })
        .then((testCategory) => {
        response.send(testCategory)
    }, (error) => {
        response.status(400).send(error)
    })
});

app.delete('/:id', (request, response) => {

    var id = request.params.id

    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    TestCategory.findByIdAndRemove(id).then((testCategory) => {
        if (!testCategory) {
            return response.status(404).send();
        }

        response.send(testCategory)
    }).catch((error) => {
        return response.status(400).send();
    })
})

module.exports = app;