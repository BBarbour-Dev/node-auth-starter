module.exports = function(req, res) {
  const { tempPassword } = req.user;
  if (!tempPassword) {
    return res.redirect("/account");
  }
  return res.render("pages/account-reset-password", {
    title: "Reset Password"
  });
};
