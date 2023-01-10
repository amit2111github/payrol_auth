const crypto = require('crypto');
const { secret } = require('../../config/vars');

const get_encrypted_password = (plainPassword) => {
  try {
    const ans = crypto
      .createHmac('sha256', secret)
      .update(plainPassword)
      .digest('hex');
    return ans;
  } catch (err) {
    return '';
  }
};

exports.get_encrypted_password = get_encrypted_password;

// console.log(get_encrypted_password('Amit'));
