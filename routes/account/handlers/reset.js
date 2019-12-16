const { validationResult } = require("express-validator");
const Account = require("../../../models/Account");
const generator = require("generate-password");
const testEmail = require("../../../config/test-email");

module.exports = async function(req, res, title) {
  const { errors } = validationResult(req);

  const { username, email } = req.body;
  const user = await Account.findOne({ username, email });

  if (errors.length > 0 || !user) {
    return res.render("pages/account-reset", {
      ...title,
      error: "Invalid username or email address."
    });
  }

  const tempPassword = generator.generate({
    length: 12,
    numbers: false
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  await user.updateOne({ tempPassword, tempPasswordExpires: tomorrow });

  const transporter = await testEmail();
  const message = {
    from: "test@test.com",
    to: email,
    subject: "Your password has been reset.",
    html: `<p>A temporary password has been generated for your account and will last 24 hours. Please login with the following credentials to create a new password.</p> Username: ${username}<br/> Temp Password: ${tempPassword}`
  };

  console.log(message); // FOR DEVELOPMENT ONLY

  const sent = await transporter.sendMail(message);
  if (!sent) {
    return res.render("pages/account-reset", {
      ...title,
      error: "Server error, please try again."
    });
  }

  req.flash(
    "success",
    "An email has been sent with your new password. Please login with it to reset."
  );
  return res.redirect("/account/login");
};
