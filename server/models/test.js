const { mongoose } = require('../db/mongoose'); 

var Test = mongoose.model('test', {
    name: {
        type: String
    }, 
    subjects: [{
        subject: {
            type: mongoose.Schema.ObjectId,
            ref: 'subject',
        },
        questions: [{
            type: mongoose.Schema.ObjectId,
            ref: 'question'
        }]
    }]
});

module.exports = { Test };