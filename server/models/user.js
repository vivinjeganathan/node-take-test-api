var { mongoose } = require('../db/mongoose'); 

var User = mongoose.model('user', {
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String
    }
});

module.exports = { User };