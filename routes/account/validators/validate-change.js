const { check } = require("express-validator");
const Account = require("../../../models/Account");

module.exports = [
  check("password").custom(async (password, { req }) => {
    const account = await Account.findById(req.user._id);
    const passwordMatch = await bcrypt.compare(password, account.password);
    if (!passwordMatch) {
      throw new Error("Invalid password.");
    }
    return true;
  }),
  check("newUsername")
    .optional()
    .isLength({ min: 3 })
    .withMessage("New username must be at least 3 characters in length."),
  check("newEmail")
    .optional()
    .isEmail()
    .withMessage("New email must be a valid address."),
  check("newPassword")
    .optional()
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters in length.")
    .custom(async (newPassword, { req }) => {
      const account = Account.findById(req.user._id);
      const passwordMatch = await bcrypt.compare(newPassword, account.password);
      if (passwordMatch) {
        throw new Error("New password cannot match current password.");
      }
      return true;
    }),
  check("passwordTwo")
    .optional()
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Confirm new password must match new password.");
      }
      return true;
    })
];
