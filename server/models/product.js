const { mongoose } = require('../db/mongoose');

var Product = mongoose.model('product', {
    name: String, // The AIEEE Complete Series...
    description: String,
    startTime: String,
    endTime: String,
    isAcademicProduct: Boolean,
    productCost: String,
    examinationGroup: {
        type: mongoose.Schema.ObjectId,
        ref: 'examinationGroup'  
    },
    tests: [{
        type: mongoose.Schema.ObjectId,
        ref: 'test'  
    }],
    associatedStudentBatches: [{
        type: mongoose.Schema.ObjectId,
        ref: 'studentBatch'
    }]
}); 

module.exports = { Product };