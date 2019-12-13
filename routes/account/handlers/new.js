const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Account = require("../../../models/Account");

module.exports = async function(req, res, title) {
  const { errors } = validationResult(req);

  const { username, email, password } = req.body;

  if (errors.length > 0) {
    return res.render("pages/account-new", {
      ...title,
      errors,
      data: { username, email }
    });
  }

  const currentAccount = await Account.findOne({ username });

  if (currentAccount) {
    return res.render("pages/account-new", {
      ...title,
      error: "Username is taken, please choose a different one.",
      data: { username, email }
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newAccount = await new Account({
    username,
    email,
    password: hash
  }).save();

  if (!newAccount) {
    return res.render("pages/account-new", {
      ...title,
      error: "Server error, please try again.",
      data: { username, email }
    });
  }

  req.flash("success", "Account registered. Please login for the first time.");
  return res.redirect("/account/login");
};
