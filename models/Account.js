const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    tempPassword: {
      type: String
    },
    tempPasswordExpires: {
      type: Date
    }
  },
  { timestamps: true }
);

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
