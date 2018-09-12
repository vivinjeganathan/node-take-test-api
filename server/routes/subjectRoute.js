const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID

const _ = require('lodash')
var { Subject } = require('../models/subject');

app.get('/', (request, response) => {

    Subject.find().then((subject) => {
        response.send({
            subject,
        })
    }, (error) => {
        response.status(400).send(error)
    })
});

app.post('/', (request, response) => {

    Subject(request.body).save().then((doc) => {
        response.send(doc);
    }, (error) => {
        response.status(400).send(error);
    })
});

app.patch('/unit', (request, response) => {

    //var id = request.params.id
    var body = _.pick(request.body, ['name', 'subjectId'])
    
    if (!ObjectID.isValid(body.subjectId)) {
        return response.status(404).send();
    }

    var unitJson = { "_id": new ObjectID(), "name": body.name, "chapters": [] };
    
    Subject.findOneAndUpdate(
        { _id: body.subjectId }, 
        { $push: { units: unitJson } },
        { "new": true },
        function (error, document) {
            if (error) {
                response.status(400).send(error)
            } else {
                response.send({document})
            }
        }
    );
})

app.patch('/unit/chapter', (request, response) => {

    var body = _.pick(request.body, ['name', 'subjectId','unitId'])
    
    if (!ObjectID.isValid(body.subjectId) && !ObjectID.isValid(body.unitId)) {
        return response.status(404).send();
    }

    var chapterJson = { "_id": new ObjectID(), "name": body.name };
    
    Subject.update(
        { "_id": ObjectID(body.subjectId), "units": { "$elemMatch": { "_id": ObjectID(body.unitId) } } },
        { $push: { "units.$[t].chapters": chapterJson } },
        { arrayFilters: [ { "t._id": ObjectID(body.unitId) }] },
        function (error, document) {
            if (error) {
                response.status(400).send(error)
            } else {
                response.send(document)
            }
        }
    );
})

module.exports = app;