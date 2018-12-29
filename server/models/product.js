const { mongoose } = require('../db/mongoose');

var Product = mongoose.model('product', {
    name: String, // The AIEEE Complete Series...
    description: String,
    startTime: String,
    endTime: String,
    isAcademicProduct: String,
    productCost: String,
    tests: [{
        type: mongoose.Schema.ObjectId,
        ref: 'test'  
    }],
    associatedStudents: [{
        type: mongoose.Schema.ObjectId,
        ref: 'studentUser'
    }]
}); 

module.exports = { Product };