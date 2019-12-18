const { validationResult } = require("express-validator");
const User = require("../../../models/User");

module.exports = async function(req, res, title) {
  const { newUsername } = req.body;
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    return res.render("pages/settings", {
      ...title,
      errors,
      data: {
        newUsername
      }
    });
  }

  const user = await User.findById(req.user._id);

  const same = newUsername === user.username;

  if (same) {
    return res.render("pages/settings", {
      ...title,
      error: "Usernames are the same.",
      data: {
        newUsername
      }
    });
  }

  const taken = await User.findOne({ username: newUsername });

  if (taken) {
    return res.render("pages/settings", {
      ...title,
      error: "New username is already taken.",
      data: {
        newUsername
      }
    });
  }

  await user.updateOne({
    username: newUsername
  });

  req.logout();
  req.flash("success", "New username updated, please login to confirm.");
  return res.redirect("/user/login");
};
