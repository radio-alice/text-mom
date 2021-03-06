const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const sendSMS = require('./js/sendSMS');
const emojify = require('./js/emojify');
const router = require('./js/routes');
const app = express();

app.set('view engine', 'ejs');

let port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);
app.listen(port);

console.log('Server running at http://localhost:' + port);

module.exports = app;