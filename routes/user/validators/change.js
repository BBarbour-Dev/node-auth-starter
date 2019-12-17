const { check } = require('express-validator');
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');

module.exports = [
  check('password').custom(async (password, { req }) => {
    const user = await User.findById(req.user._id);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid password.');
    }
    return true;
  }),
  // check('newUsername')
  //   .optional()
  //   .isLength({ min: 3 })
  //   .withMessage('New username must be at least 3 characters in length.'),
  // check('newEmail')
  //   .optional()
  //   .isEmail()
  //   .withMessage('New email must be a valid address.'),
  check('newPassword')
    .optional()
    .isLength({ min: 6 })
    .custom(async (newPassword, { req }) => {
      const user = await User.findById(req.user._id);
      const passwordMatch = await bcrypt.compare(newPassword, user.password);
      console.log(passwordMatch);
      if (passwordMatch) {
        return false;
      }
      return true;
    })
    .withMessage(
      'New password must be at least 6 characters in length and cannot be the same as current password.'
    ),
  check('passwordTwo')
    .optional()
    .custom((passwordTwo, { req }) => {
      if (passwordTwo !== req.body.newPassword) {
        return false;
      }
      return true;
    })
    .withMessage('Confirm new password must match new password.')
];
