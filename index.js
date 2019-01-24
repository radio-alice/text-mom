const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const sendSMS = require('./sendSMS')
const index =
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req,res){
 res.sendfile(__dirname + '/index.html');
});

app.post('/submit', function(req, res){
   const message = req.body.message;
   sendSMS.send(message);
   res.send("recieved your request!");
});

app.listen(3000);