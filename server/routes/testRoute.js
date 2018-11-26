const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID
const _ = require('lodash')

var { Test } = require('../models/test');
var { Examination } = require('../models/examination');

app.post('/', (request, response) => {

    var body = _.pick(request.body, ['testName', 
                                     'examinationId', 'testCategoryId', 'subjects',
                                     'duration', 'maxNoOfQuestions', 
                                     'maxMarks', 'negativeMarkingPercentage', 
                                     'instructionSetID', 'difficultyLevel'])
    
    if (!ObjectID.isValid(body.examinationId) && !ObjectID.isValid(body.testCategoryId)) {
        return response.status(404).send();
    }

    //Validate
    if(body.subjects) {
        for(subject in body.subjects) {

        }
    }

    var testJson = { "name": body.testName, 
                "examination": body.examinationId,
                "testCategory": body.testCategoryId,
                "subjects":body.subject,
                "duration": body.duration,
                "maxNoOfQuestions": body.maxNoOfQuestions,
                "maxMarks": body.maxMarks,
                "negativeMarkingPercentage": body.negativeMarkingPercentage,
                "instructionSetID": body.instructionSetID,
                "difficultyLevel": body.difficultyLevel
            };
            
    Test(request.body).save().then((test) => {
    
        Examination.update(
            { "_id": ObjectID(body.examinationId), "testCategory": { "$elemMatch": { "_id": ObjectID(body.testCategoryId) } } },
            { $push: { "testCategory.$[t].tests": test._id } },
            { arrayFilters: [ { "t._id": ObjectID(body.testCategoryId) }] },
            function (error, examination) {
                if (error) {
                    response.status(400).send(error)
                } else {
                    //response.send(test);
                    response.send(examination)
                }
            }
        );

    }, (error) => {
        response.status(400).send(error);
    })
});

app.get('/', (request, response) => {

    var query = {}

    if (request.query._id) {
        query._id = request.query._id
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
        //Remove test ref in exam table also - todo

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