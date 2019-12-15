const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Account = require("../../../models/Account");

module.exports = async function(req, res, title) {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    return res.render("pages/account-reset", { ...title, errors });
  }

  const account = await Account.findOne({ _id: req.user._id });

  const { tempPassword, password } = req.body;

  if (tempPassword !== account.tempPassword) {
    return res.render("pages/account-reset", {
      ...title,
      error: "Temp password not valid."
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  await account.updateOne({
    password: hash,
    tempPassword: null
  });

  const accountUpdated = await Account.findOne({ _id: req.user._id });
  console.log(accountUpdated);

  req.logout();
  req.flash("success", "New password updated, please login to confirm.");
  res.redirect("/account/login");
};
