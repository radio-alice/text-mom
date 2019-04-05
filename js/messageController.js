const Message = require('./messageModel');
const sendSMS = require('./sendSMS');
const emojify = require('./emojify');

exports.message_create = function (req, res) {
  var messageToSend = req.body.message;
  var emojMessage = emojify.clean(messageToSend);
  findRecent((err, data) => {
    if (err) throw err;
    // var tPlusFive = new Date(data.time.getTime() + 300000);
    // req.time = new Date();  
    // if (tPlusFive < req.time){
    if (emojMessage !== '') {
      let message = new Message(
          {
              time: req.time,
              message: emojMessage,
              sent: true
          }
      );
      message.save(function(err) {
        if (err) return next(err);
        console.log(message);
        sendSMS.send(emojMessage);
        res.send(emojMessage + "? u got it buddy!");
      })
    } else {
      res.send('uhh try again buddy');
    }
    // } else {
    //   res.send('uhh try again in a little bit buddy you guys are really double-texting too much');
    // }
  })
};

function findRecent(done){
  Message.findOne().sort({ time: -1 }).limit(1).exec((err, data) => {
            if (err) done(err);
            done(null, data);
  })
}


exports.findAll = function(done) {
  Message.find({}, 'message sent -_id', (err, data) => {
            if (err) done(err);
            done(null, data);
  })
};