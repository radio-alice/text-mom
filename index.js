const express = require('express');
var bodyParser = require('body-parser');
var app = express();
var sendSMS = require('./js/sendSMS');
var emojify = require('./js/emojify');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('public'));
app.get('/', function(req,res){
  res.sendFile(__dirname + 'public/index.html');
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
console.log('Server running at http://localhost:3000/');