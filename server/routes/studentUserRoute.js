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

    var body = _.pick(request.body, ['username','websiteLink'])

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'smartsolutionsforsuccess2011@gmail.com',
            pass: 'alwaysSm@rt'
        }
    });

    StudentUser(request.body).save().then((studentUser) => {
        
        var mailOptions = {
            from: 'smartsolutionsforsuccess2011@gmail.com',
            to: body.username,
            subject: 'Welcome to Take Test',
            text: 'You have been invited to use take test website. \n' + 
                  'Please click on the below link to create an account and start writing your tests! \n' +
                   body.websiteLink + '/' + studentUser._id + ' \n' +
                   'Please do not respond to this e-mail. This mailbox is not monitored and you will not receive a response.'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              response.send({'response':info.response})
            }
        });

    }, (error) => {
        console.log(error);
        response.status(400).send(error);
    })
});

app.get('/', (request, response) => {

    var query = {}

    if (request.query._id) {
        query._id = request.query._id
    }

    StudentUser.find(query).then((studentUser) => {
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