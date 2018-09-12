const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3000

const routes = require('./routes')

var app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/', routes)

app.listen(port, ()=> {
    console.log(`Started on port ${port}`);
})