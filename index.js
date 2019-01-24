var nodemailer = require('nodemailer');
var fs = require('fs');

var contents = fs.readFileSync('secrets.json');
var jsonContent = JSON.parse(contents);
var email = jsonContent.email;
var passw = jsonContent.password;
var number = jsonContent.number;

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: email,
        pass: passw
    }
});

module.exports.send = function (message){
  const mailOptions = {
    from: email, // sender address
    to: number,
    subject: '', // Subject line
    text: message // plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
     if(err)
       console.log(err)
     else
       console.log(info);
  });
}