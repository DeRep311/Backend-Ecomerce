module.exports=app;
const routes = require('./routes/routes.js')
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api', routes);