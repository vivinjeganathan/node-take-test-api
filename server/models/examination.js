const { mongoose } = require('../db/mongoose');

var Examination = mongoose.model('examination', {
    name: {
        type: String, // AIEEE, IIT JEE...
    }, 
    examinationGroup: {
        type: mongoose.Schema.ObjectId,
        ref: 'examinationGroup',
    }
})

module.exports = { Examination };