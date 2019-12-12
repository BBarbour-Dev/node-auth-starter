const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Account = require("../../../models/Account");

module.exports = async function(req, res, title) {
  const { errors } = validationResult(req);

  const { username, email, password } = req.body;

  if (errors.length > 0) {
    return res.render("pages/new-account", {
      ...title,
      errors,
      data: { username, email }
    });
  }

  const currentAccount = await Account.findOne({ username });

  if (currentAccount) {
    return res.render("pages/new-account", {
      ...title,
      errors: [{ msg: "Username is taken, please try a different one." }],
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
    return res.render("pages/new-account", {
      ...title,
      errors: [{ msg: "Server error, please try again." }],
      data: { username, email }
    });
  }

  return res.redirect("/account/login");
};
