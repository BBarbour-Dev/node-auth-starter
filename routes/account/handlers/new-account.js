const { validationResult } = require("express-validator");

module.exports = function(req, res, title) {
  const { errors } = validationResult(req);
  console.log(errors);
  return res.render("pages/new-account", title);
};
