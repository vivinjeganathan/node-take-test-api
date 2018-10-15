const { mongoose } = require('../db/mongoose'); 

var Test = mongoose.model('test', {
    name: {
        type: String
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