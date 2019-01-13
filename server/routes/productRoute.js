const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID

const _ = require('lodash')

var { Product } = require('../models/product');

app.post('/', (request, response) => {

    Product(request.body).save().then((product) => {
        response.send(product);
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

    if (request.query.productName) {

        Product.find( { $text: { $search: request.query.productName } } )
            .populate({ path: 'tests.name', select: 'name' })
            .then((product) => {
            response.send(product)
        }, (error) => {
            response.status(400).send(error)
        })
    } else {

        Product.find(query)
            .populate({ path: 'tests.name', select: 'name' })
            .then((product) => {
            response.send(product)
        }, (error) => {
            response.status(400).send(error)
        })
    }
});

app.delete('/:id', (request, response) => {

    var id = request.params.id

    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    Product.findByIdAndRemove(id).then((product) => {
        if (!product) {
            return response.status(404).send();
        }

        response.send(product)
    }).catch((error) => {
        return response.status(400).send();
    })
})

module.exports = app;