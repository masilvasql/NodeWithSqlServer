const express = require('express')
const bodyParser = require('body-parser')
const consgin = require('consign')
const app = express()
const cors = require('cors');
app.use(cors());


app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}))
app.use(bodyParser.json({limit:'50mb'}))


consgin()
    .include('app/routes')
    .into(app)

module.exports = app
