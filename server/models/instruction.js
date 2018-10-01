const { mongoose } = require('../db/mongoose');

var Instruction = mongoose.model('instruction', {

    name: String,
    points: {
        type: Array,
        description: String
    }
});

module.exports = { Instruction };