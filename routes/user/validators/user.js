const { check } = require("express-validator");

module.exports = [
  check("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters in length."),
  check("email")
    .isEmail()
    .withMessage("Email must be a valid address."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters in length."),
  check("passwordTwo").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Confirm password must match password.");
    }
    return true;
  })
];
