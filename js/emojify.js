const emojiRegex = require('emoji-regex');
const regex = emojiRegex();

module.exports.clean = function (text){
  var singleEmoji;
  var cleaned = '';
  while ((singleEmoji = regex.exec(text)) !== null) {
    cleaned += singleEmoji[0];
  };
  return cleaned;
}