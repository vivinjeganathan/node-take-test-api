const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID

const _ = require('lodash')

var { TakeTestAccount } = require('../models/takeTestAccount');

app.post('/', (request, response) => {

    TakeTestAccount(request.body).save().then((takeTestAccount) => {
        response.send(takeTestAccount);
    }, (error) => {
        response.status(400).send(error);
    })
});

app.get('/', (request, response) => {

    var query = {}

    if (request.query.takeTestAccountId) {
        query._id = request.query.takeTestAccountId
    }

    TakeTestAccount.find(query).then((takeTestAccount) => {
        response.send(takeTestAccount)
    }, (error) => {
        response.status(400).send(error)
    })
});

app.patch('/', (request, response) => {

    var body = _.pick(request.body, ['_id'])
    
    if (!ObjectID.isValid(body._id)) {
        return response.status(404).send();
    }
    console.log(request.body)
    TakeTestAccount.findOneAndUpdate(
        { _id: body._id }, 
        { $set: request.body }, 
        { new: true }, 
        function(error, takeTestAccount) {
            if (error) {
                response.status(400).send(error)
            } else {
                response.send(takeTestAccount)
            }
    });
})

app.delete('/:id', (request, response) => {

    var id = request.params.id

    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    TakeTestAccount.findByIdAndRemove(id).then((takeTestAccount) => {
        if (!takeTestAccount) {
            return response.status(404).send();
        }

        response.send(takeTestAccount)
    }).catch((error) => {
        return response.status(400).send();
    })
})

module.exports = app;