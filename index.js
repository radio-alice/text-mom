const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sendSMS = require('./sendSMS');
const emojify = require('./emojify');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req,res){
 res.sendFile(__dirname + '/index.html');
});

app.post('/submit', function(req, res){
   const message = req.body.message;
   const emojMessage = emojify.clean(message);
   if (emojMessage !== '') {
     sendSMS.send(emojMessage);
     res.send(emojMessage + "? u got it buddy!");
   } else {
     res.send('uhh try again buddy');
   }
});

app.listen(3000);