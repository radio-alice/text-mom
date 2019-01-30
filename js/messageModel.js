const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let messageSchema = new Schema({
  time: {type: Date, required: true},
  message: {type: String, required: true},
  sent: {type: Boolean, required: true}
})

module.exports = mongoose.model('Message', messageSchema);