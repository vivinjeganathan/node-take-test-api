const { mongoose } = require('../db/mongoose');

var Examination = mongoose.model('examination', {
    name: String, // AIEEE, IIT JEE...
    testCategory: [{
        _id: mongoose.Schema.ObjectId,
        name: String, //Revision, Mock...
        subjects: [{
            type: mongoose.Schema.ObjectId,
            ref: 'subject'
        }],
        duration: {
            type: String
        },
        maxNoOfQuestions: {
            type: String
        },
        instructionSetID:{
            type: mongoose.Schema.ObjectId,
            ref: 'Instruction'
        },
        tests: {
            type: Array,
            testRef:{
                type: mongoose.Schema.ObjectId,
                ref: 'Test'
            },
        }
    }]
}); 

module.exports = { Examination };