const { mongoose } = require('../db/mongoose');

var Product = mongoose.model('product', {
    name: String, // The AIEEE Complete Series...
    description: String,
    startTime: String,
    endTime: String,
    productCost: String,
    discountPercentage: String,
    examinations: [{
        _id: mongoose.Schema.ObjectId,
        examination: {
            type: mongoose.Schema.ObjectId,
            ref: 'examination',
        },
        testCategories: [{
            _id: mongoose.Schema.ObjectId,
            testCategory: {
                type: mongoose.Schema.ObjectId,
                ref: 'testCategory',
            },
            tests: [{
                type: mongoose.Schema.ObjectId,
                ref: 'test'  
            }]
        }],
    }]
}); 

module.exports = { Product };