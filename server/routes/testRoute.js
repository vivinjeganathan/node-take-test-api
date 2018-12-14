const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID
const _ = require('lodash')

var { Test } = require('../models/test');

app.post('/', (request, response) => {
            
    Test(request.body).save().then((test) => {
    
        response.send(test)
    }, (error) => {
        response.status(400).send(error);
    })
});

app.get('/', (request, response) => {

    var query = {}

    if (request.query._id) {
        query._id = request.query._id
    }

    if (request.query.examinationGroup) {
        query.examinationGroup = request.query.examinationGroup
    }

    if (request.query.examination) {
        query.examination = request.query.examination
    }

    if (request.query.testCategory) {
        query.testCategory = request.query.testCategory
    }
    
    Test.find(query)
        .populate({ path: 'subjects.subject', select: 'name' })
        .populate({ path: 'subjects.questions', select: 'description' }).then((doc) => {
        response.send(doc)
    }, (error) => {
        response.status(400).send(error)
    })
});

app.patch('/subject', (request, response) => {

    var body = _.pick(request.body, ['testId', 'subjectId', 'questions', 'maxMarks', 'maxNoOfQuestions'])
    
    if (!ObjectID.isValid(body.testId)) {
        return response.status(404).send();
    }

    var subjectJson = { "subject": body.subjectId, 
                        "maxMarks": body.maxMarks,
                        "maxNoOfQuestions": body.maxNoOfQuestions,
                        "questions": body.questions};

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

app.delete('', (request, response) => {

    var id = request.params.id

    Test.remove().then((test) => {
        if (!test) {
            return response.status(404).send();
        }

        response.send(test)
    }).catch((error) => {
        return response.status(400).send();
    })
})

module.exports = app;