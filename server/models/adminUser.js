var { mongoose } = require('../db/mongoose'); 

var AdminUser = mongoose.model('adminUser', {
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String
    }
});

module.exports = { AdminUser };