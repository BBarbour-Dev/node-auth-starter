const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
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

const User = mongoose.model('User', UserSchema);

module.exports = User;
