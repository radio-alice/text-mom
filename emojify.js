const emojiRegex = require('emoji-regex');
const regex = emojiRegex();

module.exports.clean = function (text){
  const cleaned = regex.exec(text)
                       .join('');
  return cleaned;
}