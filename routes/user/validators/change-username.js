const { check } = require("express-validator");
const User = require("../../../models/User");
const { checkPassword } = require("../../../helpers/password");

module.exports = [
  check("password").custom(async (password, { req }) => {
    const user = await User.findById(req.user._id);
    const passwordMatch = await checkPassword(password, user.password);
    if (!passwordMatch) {
      throw new Error("Current password is invalid.");
    }
  }),
  check("newUsername")
    .isLength({ min: 3 })
    .withMessage("New username must be at least 3 characters in length.")
];
