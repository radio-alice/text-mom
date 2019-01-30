const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const message_controller = require('./messageController');

let mongoURL = "mongodb://localhost:27017/data";
mongoose.connect(mongoURL, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.get('/mom', function(req,res){
  res.sendFile(__dirname + '/public/index.html');
});
router.get('/test', message_controller.test);
router.post('/submit', message_controller.message_create);

module.exports = router;
