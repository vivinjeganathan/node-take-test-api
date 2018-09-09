const { mongoose } = require('../db/mongoose');

var QuestionType = mongoose.model('questionType', {

    name: String
});

module.exports = { QuestionType };