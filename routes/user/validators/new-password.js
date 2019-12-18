const { check } = require("express-validator");

module.exports = [
  check("tempPassword")
    .isLength({ min: 12 })
    .withMessage("Temp password not valid."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters in length."),
  check("passwordTwo").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Confirm new password must match new password.");
    }
    return true;
  })
];
