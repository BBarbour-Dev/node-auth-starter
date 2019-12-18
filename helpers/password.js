const bcrypt = require("bcryptjs");

module.exports = {
  checkPassword: async function(password, hash) {
    return await bcrypt.compare(password, hash);
  },
  hashPassword: async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
};
