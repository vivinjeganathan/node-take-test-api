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
    Examination.find()
        .populate({ path: 'testCategory.subjects.subject', select: 'name' })
        .populate({ path: 'testCategory.tests', select: 'name' })
        .then((examination) => {
        response.send(examination)
    }, (error) => {
        response.status(400).send(error)
    })
});

app.patch('/testCategory', (request, response) => {

    var body = _.pick(request.body, ['examId', 'name', 'duration', 'maxNoOfQuestions','maxMarks','negativeMarkingPercentage'])
    
    if (!ObjectID.isValid(body.examId)) {
        return response.status(404).send();
    }

    var testCategoryJson = { "_id": new ObjectID(),
                             "name": body.name, 
                             "duration": body.duration,
                             "maxNoOfQuestions":body.maxNoOfQuestions,
                             "maxMarks":body.maxMarks,
                             "negativeMarkingPercentage":body.negativeMarkingPercentage, 
                             "subjects": [], "tests": []};

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

//Needs to be called on post test method 
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

    var body = _.pick(request.body, ['examId', 'testCategoryId', 'subjectId', 'maxNoOfQuestions', 'maxMarks'])
    
    if (!ObjectID.isValid(body.examId) && !ObjectID.isValid(body.testCategoryId)) {
        return response.status(404).send();
    }

    var subjectRefJson = { "subject": body.subjectId, "maxNoOfQuestions": body.maxNoOfQuestions, 'maxMarks': body.maxMarks};

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