const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID

const _ = require('lodash')

var { TestType } = require('../models/testType');

app.post('/', (request, response) => {

    TestType(request.body).save().then((testType) => {
        response.send(testType);
    }, (error) => {
        response.status(400).send(error);
    })
});

app.get('/', (request, response) => {
    TestType.find().then((testType) => {
        response.send(
            testType
        )
    }, (error) => {
        response.status(400).send(error)
    })
});

app.patch('/subType', (request, response) => {

    var body = _.pick(request.body, ['testTypeId', 'name'])
    
    if (!ObjectID.isValid(body.testTypeId)) {
        return response.status(404).send();
    }

    var subTypeJson = { "subTypeId": new ObjectID(), "name": body.name};
    
    TestType.findOneAndUpdate(
        { _id: body.testTypeId }, 
        { $push: { subTypes: subTypeJson } },
        { "new": true },
        function (error, testType) {
            if (error) {
                response.status(400).send(error)
            } else {
                response.send({testType})
            }
        }
    );
})

app.delete('/:id', (request, response) => {

    var id = request.params.id

    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    TestType.findByIdAndRemove(id).then((testType) => {
        if (!testType) {
            return response.status(404).send();
        }

        response.send(testType)
    }).catch((error) => {
        return response.status(400).send();
    })
})

module.exports = app;