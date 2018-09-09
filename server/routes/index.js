const express = require('express');
const app = express();

const subjectRoute = require('./subjectRoute');
const questionRoute = require('./questionRoute');

app.use('/question', questionRoute);
app.use('/subject', subjectRoute);

module.exports = app;
