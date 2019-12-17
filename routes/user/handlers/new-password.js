const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../../../models/User');

module.exports = async function(req, res, title) {
  const { errors } = validationResult(req);

  if (errors.length > 0) {
    return res.render('pages/new-password', { ...title, errors });
  }

  const user = await User.findOne({ _id: req.user._id });

  const { tempPassword, password } = req.body;

  if (tempPassword !== user.tempPassword) {
    return res.render('pages/new-password', {
      ...title,
      error: 'Invalid temporary password.'
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  await user.updateOne({
    password: hash,
    tempPassword: null,
    tempPasswordExpires: null
  });

  req.logout();
  req.flash('success', 'New password updated, please login to confirm.');
  res.redirect('/user/login');
};
