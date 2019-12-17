function checkIsAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('error', 'Not authorized, pelase login and try again.');
    return res.redirect('/user/login');
  }
  const { tempPassword } = req.user;
  if (tempPassword) {
    req.flash('success', 'You must create a new password before proceeding.');
    return res.redirect('/user/new-password');
  }
  return next();
}

function checkIsAuthForReset(req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('error', 'Not authorized, pelase login and try again.');
    return res.redirect('/user/login');
  }
  return next();
}

function checkIsNotAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/dashboard');
}

module.exports = {
  checkIsAuth,
  checkIsAuthForReset,
  checkIsNotAuth
};
