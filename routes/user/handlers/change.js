const { validationResult } = require('express-validator');
module.exports = function(req, res, title) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    return res.render('pages/settings', { ...title, errors });
  }
  return res.redirect('/settings');
};
