const express = require('express');
const app = express();

const subjectRoute = require('./subjectRoute');
const questionRoute = require('./questionRoute');
const questionTypeRoute = require('./questionTypeRoute');
const testRoute = require('./testRoute');
const instructionRoute = require('./instructionRoute');
const examinationGroupRoute = require('./examinationGroupRoute');
const examinationRoute = require('./examinationRoute');
const testCategoryRoute = require('./testCategoryRoute');
const studentUserRoute = require('./studentUserRoute');
const productRoute = require('./productRoute');

app.use('/question', questionRoute);
app.use('/subject', subjectRoute);
app.use('/questionType', questionTypeRoute);
app.use('/test', testRoute);
app.use('/instruction', instructionRoute);
app.use('/examinationGroup', examinationGroupRoute);
app.use('/examination', examinationRoute);
app.use('/testCategory', testCategoryRoute);
app.use('/studentUser', studentUserRoute);
app.use('/product', productRoute);

module.exports = app;
