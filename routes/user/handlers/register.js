const { validationResult } = require("express-validator");
const { hashPassword } = require("../../../helpers/password");
const User = require("../../../models/User");

module.exports = async function(req, res, title) {
  const { errors } = validationResult(req);

  const { username, email, password } = req.body;

  if (errors.length > 0) {
    return res.render("pages/register", {
      ...title,
      errors,
      data: { username, email }
    });
  }

  const currentUser = await User.findOne({ username });

  if (currentUser) {
    return res.render("pages/register", {
      ...title,
      error: "Username is taken, please choose a different one.",
      data: { username, email }
    });
  }

  const hash = await hashPassword(password);

  const newUser = await new User({
    username,
    email,
    password: hash
  }).save();

  if (!newUser) {
    return res.render("pages/register", {
      ...title,
      error: "Server error, please try again.",
      data: { username, email }
    });
  }

  req.flash("success", "User registered. Please login for the first time.");
  return res.redirect("/user/login");
};
