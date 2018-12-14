const { mongoose } = require('../db/mongoose');

var ExaminationGroup = mongoose.model('examinationGroup', {
    name: {
        type: String //Eng entrance, Med entrance, Bank...
    }
})

module.exports = { ExaminationGroup };