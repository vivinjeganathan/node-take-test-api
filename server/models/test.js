const { mongoose } = require('../db/mongoose'); 

var Test = mongoose.model('test', {
    name: {
        type: String
    }, 
    examinationGroup:{
        type: mongoose.Schema.ObjectId,
        ref: 'examinationGroup',
    },
    examination:{
        type: mongoose.Schema.ObjectId,
        ref: 'examination',
    },
    testCategory:{
        type: mongoose.Schema.ObjectId,
        ref: 'testCategory',
    },
    subjects: [{
        subject: {
            type: mongoose.Schema.ObjectId,
            ref: 'subject',
        },
        questions: [{
            type: mongoose.Schema.ObjectId,
            ref: 'question'
        }],
        maxMarks:{
            type: String
        },
        maxNoOfQuestions: {
            type: String
        }
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
    difficultyLevel:{
        type: String
    }
});

module.exports = { Test };