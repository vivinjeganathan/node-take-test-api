const express = require('express');
const app = express();

const subjectRoute = require('./subjectRoute');
const questionRoute = require('./questionRoute');
const questionTypeRoute = require('./questionTypeRoute');
const testRoute = require('./testRoute');
const instructionRoute = require('./instructionRoute');
const testTypeRoute = require('./testTypeRoute');

app.use('/question', questionRoute);
app.use('/subject', subjectRoute);
app.use('/questionType', questionTypeRoute);
app.use('/test', testRoute);
app.use('/instruction', instructionRoute);
app.use('/testType', testTypeRoute);

module.exports = app;
