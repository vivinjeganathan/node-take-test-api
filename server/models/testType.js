const { mongoose } = require('../db/mongoose');

var TestType = mongoose.model('testType', {
    name: String,
    subTypes: {
        _id: mongoose.Schema.ObjectId,
        type: Array,
        name: String,
        subjects: {
            type: Array,
            subjectRef:{
                type: mongoose.Schema.ObjectId,
                ref: 'Subject'
            }, 
        }
    }
}); 

module.exports = { TestType };