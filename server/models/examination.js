const { mongoose } = require('../db/mongoose');

var Examination = mongoose.model('examination', {
    name: String, // AIEEE, IIT JEE...
    testCategory: [{
        _id: mongoose.Schema.ObjectId,
        name: String, //Revision, Mock...
        subjects: [{
            subject: {
                type: mongoose.Schema.ObjectId,
                ref: 'subject',
            },
            maxNoOfQuestions: [{
                type: String
            }],
            maxMarks:{
                type: String
            },
        }],
        duration: {
            type: String
        },
        maxNoOfQuestions: {
            type: String
        },
        maxMarks:{
            type: String
        },
        negativeMarkingPercentage:{
            type: String
        },
        instructionSetID:{
            type: mongoose.Schema.ObjectId,
            ref: 'instruction'
        },
        tests: [{
            type: mongoose.Schema.ObjectId,
            ref: 'test'  
        }]
    }]
}); 

module.exports = { Examination };