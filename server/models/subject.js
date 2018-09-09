const { mongoose } = require('../db/mongoose');
const ObjectID = require('mongodb').ObjectID

var Subject = mongoose.model('subject', {
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
});

module.exports = { Subject };