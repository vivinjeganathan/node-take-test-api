const { mongoose } = require('../db/mongoose'); 

var Test = mongoose.model('test', {
    name: {
        type: String
    }, 
    type: {
        type: String
    },
    subType: {
        type: String
    },
    duration: {
        type: String
    },
    instructionSetID:{
        type: mongoose.Schema.ObjectId,
        ref: 'Instruction'
    }, 
    subjects: {

        type: Array,
        subjectRef: {
            type: mongoose.Schema.ObjectId,
            ref: 'Subject',
        },
        questions: {
            type: Array,
            questionRef: {
                type: mongoose.Schema.ObjectId,
                ref: 'Question'
            }
        }
    }
});

module.exports = { Test };