const { validationResult } = require("express-validator");
const Account = require("../../../models/Account");
const generator = require("generate-password");
const testEmail = require("../../../config/test-email");

module.exports = async function(req, res, title) {
  const { errors } = validationResult(req);
  const { username, email } = req.body;
  const user = await Account.findOne({ username, email });
  if (errors.length > 0 || !user) {
    return res.render("pages/account-recover", {
      title,
      error: "Invalid username or email address."
    });
  }
  const tempPassword = generator.generate({
    length: 12,
    numbers: false
  });
  await user.updateOne({ tempPassword });
  const transporter = await testEmail();
  const message = {
    from: "test@test.com",
    to: email,
    subject: "Your password has been reset.",
    html: `<p>Please login with your new credentials.</p> Username: ${username}<br/> New Password: ${tempPassword}`
  };
  console.log(message);
  const sent = await transporter.sendMail(message);
  if (!sent) {
    return res.render("pages/account-recover", {
      title,
      error: "Server error, please try again."
    });
  }
  req.flash(
    "success",
    "An email has been sent with your new password. Please login with it to reset."
  );
  return res.redirect("/account/login");
};
