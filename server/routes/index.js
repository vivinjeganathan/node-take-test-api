const express = require('express');
const app = express();

const subjectRoute = require('./subjectRoute');
const questionRoute = require('./questionRoute');
const questionTypeRoute = require('./questionTypeRoute');

app.use('/question', questionRoute);
app.use('/subject', subjectRoute);
app.use('/questionType', questionTypeRoute);

module.exports = app;
