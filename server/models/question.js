var { mongoose } = require('../db/mongoose'); 

var Question = mongoose.model('question', {
    forExam: {
       type: String
    }, 
    category: {
       type: String
    },
    unit: {
        type: String
    },
    subUnit: {
        type: String
    },
    forExam: {
        type: String
    },
    description: {
        type: String
    },
    optionA: {
        type: String
    },
    optionB: {
        type: String
    },
    optionC: {
        type: String
    },
    optionD: {
        type: String
    },
    correctOption: {
        type : String
    },
    complexity: {
        type: Number
    },
    maxTimeLimit: {
        type: Number
    },
    solutionDescription: {
        type: String
    }
});

module.exports = { Question };