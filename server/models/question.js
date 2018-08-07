var { mongoose } = require('../db/mongoose'); 

var Question = mongoose.model('question', {
    exam: {
       type: String
    }, 
    subject: {
       type: String
    },
    unit: {
        type: String
    },
    chapter: {
        type: String
    },
    type: {
        type: String
    },
    description: {
        type: String
    },
    options: {
        type: Array
    },
    correctOption: {
        type : String
    },
    complexity: {
        type: String
    },
    maxTimeLimit: {
        type: String
    },
    solutionDescription: {
        type: String
    }
});

module.exports = { Question };