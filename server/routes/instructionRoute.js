const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID

var { Instruction } = require('../models/instruction');

app.post('/', (request, response) => {

    Instruction(request.body).save().then((instruction) => {
        response.send(instruction);
    }, (error) => {
        response.status(400).send(error);
    })
});

app.get('/', (request, response) => {
    Instruction.find().then((instruction) => {
        response.send(
            instruction
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

    Instruction.findByIdAndRemove(id).then((instruction) => {
        if (!instruction) {
            return response.status(404).send();
        }

        response.send(instruction)
    }).catch((error) => {
        return response.status(400).send();
    })
})

module.exports = app;