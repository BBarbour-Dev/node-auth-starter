const { validationResult } = require("express-validator");
const User = require("../../../models/User");

module.exports = async function(req, res, title) {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    return res.render("pages/settings", { ...title, errors });
  }

  const { newEmail } = req.body;

  const user = await User.findById(req.user._id);

  const same = newEmail === user.email;

  if (same) {
    return res.render("pages/settings", {
      ...title,
      error: "Emails are the same.",
      data: {
        newEmail
      }
    });
  }

  await user.updateOne({
    email: newEmail
  });

  return res.render("pages/settings", {
    ...title,
    success: "Email has been updated."
  });
};
