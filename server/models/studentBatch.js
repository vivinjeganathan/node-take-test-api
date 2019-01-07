var { mongoose } = require('../db/mongoose'); 

var StudentBatch = mongoose.model('studentBatch', {
    name: String,
    examinationGroups: [{
        type: mongoose.Schema.ObjectId,
        ref: 'examinationGroup'  
    }]
});

module.exports = { StudentBatch };