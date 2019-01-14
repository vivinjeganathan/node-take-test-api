var { mongoose } = require('../db/mongoose'); 

var TakeTestAccount = mongoose.model('takeTestAccount', {
    companyName: String,
    proprietorName: String,
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    supportEmail: {
        type: String
    },
    supportMobile: {
        type: String
    }, 
    paymentGateways: [{
        type: String
    }],
    address: {
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
});

module.exports = { TakeTestAccount };