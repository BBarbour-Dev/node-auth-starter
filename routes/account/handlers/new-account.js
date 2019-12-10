module.exports = function(req, res, title) {
  const errors = [];

  const { password, passwordTwo } = req.body;

  if (password !== passwordTwo) {
    errors.push("Your passwords must match");
  }

  if (errors.length > 0) {
    return res.render("pages/new-account", {
      errors,
      data: req.body,
      ...title
    });
  }

  return res.render("pages/new-account", locals);
};
