const express = require('express');
const app = express();

const questionStructureRoute = require('./questionStructure_route');
const questionRoute = require('./question_route');

app.use('/question', questionRoute);
app.use('/questionStructure', questionStructureRoute);

module.exports = app;
