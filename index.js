const express = require('express');
const app = express();
const sendSMS = require('./js/sendSMS');
const emojify = require('./js/emojify');
const path = require('path');

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, '/public')));

app.get('/mom', function(req,res){
  res.sendFile(__dirname + '/public/index.html');
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