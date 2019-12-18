const { validationResult } = require("express-validator");
const { checkPassword, hashPassword } = require("../../../helpers/password");
const User = require("../../../models/User");

module.exports = async function(req, res, title) {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    return res.render("pages/settings", { ...title, errors });
  }

  const user = await User.findById(req.user._id);

  const { newPassword } = req.body;

  const same = await checkPassword(newPassword, user.password);

  if (same) {
    return res.render("pages/settings", {
      ...title,
      error: "New password matches old password."
    });
  }

  const hash = await hashPassword(newPassword);

  await user.updateOne({
    password: hash
  });

  req.logout();
  req.flash("success", "Password updated, please login to confirm.");
  return res.redirect("/user/login");
};
