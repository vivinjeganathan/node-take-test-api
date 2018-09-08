const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID

var { QuestionStructure } = require('.././models/questionStructure');

// app.post('/questionStructure', (request, response) => {

//     QuestionStructure(request.body).save().then((doc) => {
//         response.send(doc);
//     }, (error) => {
//         response.status(400).send(error);
//     })
// });

app.get('/', (request, response) => {

    QuestionStructure.find().then((questionStructure) => {
        response.send({
            questionStructure,
        })
    }, (error) => {
        response.status(400).send(error)
    })
});

// app.patch('/questionStructure', (request, response) => {

//   var id = request.params.id
//   var body = _.pick(request.body, ['unitId',''])

//   //console.log(`subject patching ${body}`);

//   if (!ObjectID.isValid(id)) {
//       return response.status(404).send();
//   }

//   Subject.findByIdAndUpdate(id, {
//       $set: request.body
//   }, {
//       new: true
//   }).then((subject) => {

//       if(!subject) {
//           return response.status(404).send();
//       }

//       response.send({subject})
      
//   }).catch((error) => {
//       response.status(400).send(error)
//   })
// })

module.exports = app;