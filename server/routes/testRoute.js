const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID

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
        response.send(
            doc
        )
    }, (error) => {
        response.status(400).send(error)
    })
});

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