const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID
const _ = require('lodash')
var nodemailer = require('nodemailer');

var { StudentUser } = require('../models/studentUser');

app.post('/', (request, response) => {

    StudentUser(request.body).save().then((studentUser) => {
        response.send(studentUser);
    }, (error) => {
        response.status(400).send(error);
    })
});

app.post('/sendInvite', (request, response) => {

    var body = _.pick(request.body, ['toEmail'])

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'smartsolutionsforsuccess2011@gmail.com',
            pass: 'alwaysSm@rt'
        }
    });

    var mailOptions = {
        from: 'smartsolutionsforsuccess2011@gmail.com',
        to: body.toEmail,
        subject: 'Welcome to Take Test',
        text: 'Please login and create an account'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          response.send(info.response)
        //   StudentUser(request.body).save().then((studentUser) => {
        //         response.send(studentUser);
        //     }, (error) => {
        //         response.status(400).send(error);
        //     })
        }
    });
});

app.get('/', (request, response) => {
    StudentUser.find().then((studentUser) => {
        response.send(
            studentUser
        )
    }, (error) => {
        response.status(400).send(error)
    })
});

app.patch('/', (request, response) => {

    var body = _.pick(request.body, ['studentId', 'firstName', 'lastName',
                                     'mobileNumber', 'gender',
                                     'dateOfBirth', 'address', 
                                     'password', 'preferredExams'])
    
    if (!ObjectID.isValid(body.studentId)) {
        return response.status(404).send();
    }
    
    var studentJson = { "firstName": body.firstName, "lastName": body.lastName,
                        "gender": body.gender, "dateOfBirth": body.dateOfBirth,
                        "address": body.address,"password": body.password,
                        "preferredExams": body.preferredExams };
    
    StudentUser.findOneAndUpdate(
        { _id: body.studentId }, 
        { $set: studentJson }, 
        { new: true }, 
        function(error, studentUser) {
            if (error) {
                response.status(400).send(error)
            } else {
                response.send(studentUser)
            }
    });
})

app.delete('/:id', (request, response) => {

    var id = request.params.id

    if (!ObjectID.isValid(id)) {
        return response.status(404).send();
    }

    StudentUser.findByIdAndRemove(id).then((studentUser) => {
        if (!studentUser) {
            return response.status(404).send();
        }

        response.send(studentUser)
    }).catch((error) => {
        return response.status(400).send();
    })
})

module.exports = app;