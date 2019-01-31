const Message = require('./messageModel');
const sendSMS = require('./sendSMS');
const emojify = require('./emojify');

exports.message_create = function (req, res) {
    var messageToSend = req.body.message;
    var emojMessage = emojify.clean(messageToSend);
    if (emojMessage !== '') {
      req.time = new Date();
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
  };

exports.findAll = function(done) {
  Message.find((err, data) => {
  if (err) done(err);
  done(null, data);
  })
};

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};