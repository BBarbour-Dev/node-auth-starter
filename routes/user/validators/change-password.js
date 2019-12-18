const { check } = require("express-validator");
const { checkPassword } = require("../../../helpers/password");
const User = require("../../../models/User");

module.exports = [
  check("password").custom(async (password, { req }) => {
    const user = await User.findById(req.user._id);
    const passwordMatch = await checkPassword(password, user.password);
    if (!passwordMatch) {
      throw new Error("Current password is invalid.");
    }
  }),
  check("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters in length."),
  check("newPasswordTwo").custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Confirm new password must match new password.");
    }
    return true;
  })
];
