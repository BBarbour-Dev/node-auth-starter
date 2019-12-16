function checkIsAuth(req, res, next) {
  if (req.isAuthenticated()) {
    const { tempPassword } = req.user;
    if (tempPassword) {
      req.flash(
        'error',
        'Your password has been reset. Please create a new password.'
      );
      return res.redirect('/account/new-password');
    }
    return next();
  }
  req.flash('error', 'Not authorized, pelase login and try again.');
  return res.redirect('/account/login');
}

function checkIsAuthForReset(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Not authorized, pelase login and try again.');
  return res.redirect('/account/login');
}

function checkIsNotAuth(req, res, next) {
  if (req.isAuthenticated()) {
    req.flash('error');
    return res.redirect('/dashboard');
  }
  return next();
}

module.exports = {
  checkIsAuth,
  checkIsAuthForReset,
  checkIsNotAuth
};
