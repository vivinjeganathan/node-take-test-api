var { mongoose } = require('../db/mongoose'); 

var StudentUser = mongoose.model('studentUser', {
    firstName: String,
    lastName: String,
    mobileNumber: String,
    gender: String,
    dateOfBirth: Date,
    registrationDate: { 
        type: Date, 
        default: Date.now 
    },
    address: {
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String
    },
    preferredExams: {
        type: mongoose.Schema.ObjectId,
        ref: 'examination',
    },
    status: {
        type: String
    },
    group: {
        type: mongoose.Schema.ObjectId,
        ref: 'studentBatch'
    }
});

module.exports = { StudentUser };