const { mongoose } = require('../db/mongoose');

var TestCategory = mongoose.model('testCategory', {
    name: String, //Revision, Mock...
    subjects: [{
        subject: {
            type: mongoose.Schema.ObjectId,
            ref: 'subject',
        },
        maxNoOfQuestions: {
            type: String
        },
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
    examination: {
        type: mongoose.Schema.ObjectId,
        ref: 'examination',
    },
    examinationGroup: {
        type: mongoose.Schema.ObjectId,
        ref: 'examinationGroup',
    }
})

module.exports = { TestCategory };