var { mongoose } = require('../db/mongoose'); 

var AdminUser = mongoose.model('adminUser', {
    firstName: String,
    lastName: String,
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
    profile: {
        type: String
    }
});

module.exports = { AdminUser };