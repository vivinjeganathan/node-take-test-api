const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID

const _ = require('lodash')
var { Subject } = require('../models/subject');

app.get('/', (request, response) => {

    Subject.find().then((subject) => {
        response.send(subject)
    }, (error) => {
        response.status(400).send(error)
    })
});

app.get('/all', (request, response) => {

    Subject.find().then((subject) => {
        response.send({subject})
        //response.send({"asd" : {subject}})
    }, (error) => {
        response.status(400).send(error)
    })
});

app.post('/', (request, response) => {

    Subject(request.body).save().then((subject) => {
        response.send(subject);
    }, (error) => {
        response.status(400).send(error);
    })
});

app.patch('/unit', (request, response) => {

    var body = _.pick(request.body, ['name', 'subjectId'])
    
    if (!ObjectID.isValid(body.subjectId)) {
        return response.status(404).send();
    }

    var unitJson = { "_id": new ObjectID(), "name": body.name, "chapters": [] };
    
    Subject.findOneAndUpdate(
        { _id: body.subjectId }, 
        { $push: { units: unitJson } },
        { "new": true },
        function (error, subject) {
            if (error) {
                response.status(400).send(error)
            } else {
                response.send({subject})
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
        function (error, subject) {
            if (error) {
                response.status(400).send(error)
            } else {
                response.send(subject)
            }
        }
    );
})

app.delete('/:id', (request, response) => {

    var id = request.params.id

    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    Subject.findByIdAndRemove(id).then((subject) => {
        if (!subject) {
            return response.status(404).send();
        }

        response.send(subject)
    }).catch((error) => {
        return response.status(400).send();
    })
})

// app.delete('/unit/', (request, response) => {

//     var id = request.params.id
//     var body = _.pick(request.body, ['subjectId', 'unitId'])

//     if (!ObjectID.isValid(id)) {
//         return response.status(404).send();
//     }
    
//     var unitJson = { "_id": new ObjectID(), "name": body.name, "chapters": [] };
    
//     Subject.findOneAndUpdate(
//         { _id: body.subjectId }, 
//         { $push: { units: unitJson } },
//         { "new": true },
//         function (error, document) {
//             if (error) {
//                 response.status(400).send(error)
//             } else {
//                 response.send({document})
//             }
//         }
//     );
// })

module.exports = app;