const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID

const _ = require('lodash')

var { ExaminationGroup } = require('../models/examinationGroup');

app.post('/', (request, response) => {

    ExaminationGroup(request.body).save().then((examinationGroup) => {
        response.send(examinationGroup);
    }, (error) => {
        response.status(400).send(error);
    })
});

app.get('/', (request, response) => {
    ExaminationGroup.find().then((examinationGroup) => {
        response.send(examinationGroup)
    }, (error) => {
        response.status(400).send(error)
    })
});

app.delete('/:id', (request, response) => {

    var id = request.params.id

    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    ExaminationGroup.findByIdAndRemove(id).then((examinationGroup) => {
        if (!examinationGroup) {
            return response.status(404).send();
        }

        response.send(examinationGroup)
    }).catch((error) => {
        return response.status(400).send();
    })
})

module.exports = app;