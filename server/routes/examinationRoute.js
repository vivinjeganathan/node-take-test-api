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
    Examination.find().then((examination) => {
        response.send(examination)
    }, (error) => {
        response.status(400).send(error)
    })
});

app.patch('/testCategory', (request, response) => {

    var body = _.pick(request.body, ['examId', 'name', 'duration'])
    
    if (!ObjectID.isValid(body.examId)) {
        return response.status(404).send();
    }

    var testCategoryJson = { "_id": new ObjectID(), "name": body.name, "duration": body.duration, "subjects": [], "tests": []};

    Examination.findOneAndUpdate(
        { _id: body.examId }, 
        { $push: { testCategory: testCategoryJson } },
        { "new": true },
        function (error, examination) {
            if (error) {
                response.status(400).send(error)
            } else {
                response.send(examination)
            }
        }
    );
})

app.patch('/testCategory/test', (request, response) => {

    var body = _.pick(request.body, ['examId', 'testCategoryId', 'testId'])
    
    if (!ObjectID.isValid(body.examId) && !ObjectID.isValid(body.testCategoryId)) {
        return response.status(404).send();
    }

    var testRefJson = { "testRef": body.testId };

    Examination.update(
        { "_id": ObjectID(body.examId), "testCategory": { "$elemMatch": { "_id": ObjectID(body.testCategoryId) } } },
        { $push: { "testCategory.$[t].tests": testRefJson } },
        { arrayFilters: [ { "t._id": ObjectID(body.testCategoryId) }] },
        function (error, examination) {
            if (error) {
                response.status(400).send(error)
            } else {
                response.send(examination)
            }
        }
    );
})

app.patch('/testCategory/subject', (request, response) => {

    var body = _.pick(request.body, ['examId', 'testCategoryId', 'subjectId'])
    
    if (!ObjectID.isValid(body.examId) && !ObjectID.isValid(body.testCategoryId)) {
        return response.status(404).send();
    }

    var subjectRefJson = { "subjectRef": body.subjectId };

    Examination.update(
        { "_id": ObjectID(body.examId), "testCategory": { "$elemMatch": { "_id": ObjectID(body.testCategoryId) } } },
        { $push: { "testCategory.$[t].subjects": subjectRefJson } },
        { arrayFilters: [ { "t._id": ObjectID(body.testCategoryId) }] },
        function (error, examination) {
            if (error) {
                response.status(400).send(error)
            } else {
                response.send(examination)
            }
        }
    );
})

app.delete('/:id', (request, response) => {

    var id = request.params.id

    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    Examination.findByIdAndRemove(id).then((examination) => {
        if (!examination) {
            return response.status(404).send();
        }

        response.send(examination)
    }).catch((error) => {
        return response.status(400).send();
    })
})

module.exports = app;