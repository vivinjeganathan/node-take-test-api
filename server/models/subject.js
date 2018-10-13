const { mongoose } = require('../db/mongoose');

var Subject = mongoose.model('subject', {
    name: String, 
    units: {
        _id: mongoose.Schema.ObjectId,
        type: Array,
        name: String,
        chapters: {
            _id: mongoose.Schema.ObjectId,
            name: String,
            type: Array
        }
    }    
});

module.exports = { Subject };