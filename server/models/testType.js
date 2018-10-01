const { mongoose } = require('../db/mongoose');

var TestType = mongoose.model('testType', {

    name: String,
    subTypes: {
        type: Array,
        subTypeId: mongoose.Schema.ObjectId,
        name: String,
    }
});

module.exports = { TestType };