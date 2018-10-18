const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID
const _ = require('lodash')

var { Test } = require('../models/test');

app.post('/', (request, response) => {

    Test(request.body).save().then((test) => {
        response.send(test);
    }, (error) => {
        response.status(400).send(error);
    })
});

app.get('/', (request, response) => {
    Test.find().then((doc) => {
        response.send(doc)
    }, (error) => {
        response.status(400).send(error)
    })
});

app.patch('/subject', (request, response) => {

    var body = _.pick(request.body, ['testId','subjectId'])
    
    if (!ObjectID.isValid(body.testId)) {
        return response.status(404).send();
    }

    var subjectJson = { "subject": body.subjectId, 
                        "questions": []};

    Test.findOneAndUpdate(
        { _id: body.testId }, 
        { $push: { subjects: subjectJson } },
        { "new": true },
        function (error, test) {
            if (error) {
                response.status(400).send(error)
            } else {
                response.send(test)
            }
        }
    );
})

app.delete('/:id', (request, response) => {

    var id = request.params.id

    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    Test.findByIdAndRemove(id).then((test) => {
        if (!test) {
            return response.status(404).send();
        }

        response.send(test)
    }).catch((error) => {
        return response.status(400).send();
    })
})

module.exports = app;