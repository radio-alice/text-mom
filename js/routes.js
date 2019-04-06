const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const message_controller = require('./messageController');

var contents = fs.readFileSync(path.join(__dirname, '../secrets.json'));
var jsonContent = JSON.parse(contents);
var mongoUser = jsonContent.mongoUser;
var mongoPw = jsonContent.mongoPw;

let mongoURL = "mongodb://" + mongoUser + ":" +
                mongoPw + "@ds037283.mlab.com:37283/fatboys";
mongoose.connect(mongoURL, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.use('/mom', express.static(path.join(__dirname, '../views')));

router.get('/mom', function(req, res, next){
  let messages = [{}];
  message_controller.findAll(function(err, messages){
    if (err) console.log(err);
    res.render('index.ejs', {messages : messages});
  })
});

router.post('/mom/submit', message_controller.message_create);

module.exports = router;
