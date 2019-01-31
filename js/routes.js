const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const message_controller = require('./messageController');

let mongoURL = "mongodb://localhost:27017/data";
mongoose.connect(mongoURL, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
router.use('/mom', express.static(path.join(__dirname, '../views')));

router.get('/mom', function(req,res, next){
  let messages = [];
  message_controller.findAll(function(err, messages){
    if (err) console.log(err);
    var cleanMessages = messages.map(x => x.message);
    res.render('index.ejs', {messages : cleanMessages});
  })
});
router.get('/test', message_controller.test);
router.post('/submit', message_controller.message_create);

module.exports = router;
