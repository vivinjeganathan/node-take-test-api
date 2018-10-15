const { mongoose } = require('../db/mongoose');

var Examination = mongoose.model('examination', {
    name: String, // AIEEE, IIT JEE...
    testCategory: {
        _id: mongoose.Schema.ObjectId,
        type: Array,
        name: String, //Revision, Mock...
        subjects: {
            type: Array,
            subjectRef:{
                type: mongoose.Schema.ObjectId,
                ref: 'Subject'
            }, 
        },
        duration: {
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
                ref: 'test'
            },
        }
    }
}); 

module.exports = { Examination };