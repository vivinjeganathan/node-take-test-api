const { mongoose } = require('../db/mongoose');
const ObjectID = require('mongodb').ObjectID

var QuestionStructure = mongoose.model('questionStructure', {
    subjects: {
        _id: ObjectID,
        type: Array,
        name: String, 
        units: {
            _id: ObjectID,
            type: Array,
            name: String,
            chapters: {
                _id: ObjectID,
                type: Array,
                name: String
            }
        }
    },
    types: {
        _id: ObjectID,
        type: Array,
        name: String
    }
});

module.exports = { QuestionStructure };