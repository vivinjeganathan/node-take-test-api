const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID

const _ = require('lodash')

var { AdminUser } = require('../models/adminUser');

app.post('/', (request, response) => {

    AdminUser(request.body).save().then((adminUser) => {
        response.send(adminUser);
    }, (error) => {
        response.status(400).send(error);
    })
});

app.get('/', (request, response) => {

    var query = {}

    if (request.query.adminUserId) {
        query._id = request.query.adminUserId
    }

    AdminUser.find(query).then((adminUser) => {
        response.send(adminUser)
    }, (error) => {
        response.status(400).send(error)
    })
});

app.delete('/:id', (request, response) => {

    var id = request.params.id

    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    AdminUser.findByIdAndRemove(id).then((adminUser) => {
        if (!adminUser) {
            return response.status(404).send();
        }

        response.send(adminUser)
    }).catch((error) => {
        return response.status(400).send();
    })
})

module.exports = app;