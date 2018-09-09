const express = require('express');
const app = express();
const ObjectID = require('mongodb').ObjectID

var { Subject } = require('../models/subject');

app.get('/', (request, response) => {

    Subject.find().then((subject) => {
        response.send({
            subject,
        })
    }, (error) => {
        response.status(400).send(error)
    })
});

app.patch('/subject', (request, response) => {

  var id = request.params.id
  var body = _.pick(request.body, ['name'])

//   Subject.find().then((id, {
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
})


// app.patch('/unit', (request, response) => {

//     var id = request.params.id
//     var body = _.pick(request.body, ['unitId',''])
  
//     //console.log(`subject patching ${body}`);
  
//     if (!ObjectID.isValid(id)) {
//         return response.status(404).send();
//     }
  
//     Subject.findByIdAndUpdate(id, {
//         $set: request.body
//     }, {
//         new: true
//     }).then((subject) => {
  
//         if(!subject) {
//             return response.status(404).send();
//         }
  
//         response.send({subject})
        
//     }).catch((error) => {
//         response.status(400).send(error)
//     })
//   })

module.exports = app;