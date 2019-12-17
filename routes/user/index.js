const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  checkIsAuth,
  checkIsAuthForReset,
  checkIsNotAuth
} = require('../../middleware/auth');

// VALIDATORS

const validateUser = require('./validators/user');
const validateReset = require('./validators/reset');
const validateNewPassword = require('./validators/password');
const validateChange = require('./validators/change');

// ROUTE HANDLERS

const registerUser = require('./handlers/register');
const resetPassword = require('./handlers/reset');
const newPassword = require('./handlers/new-password');
const change = require('./handlers/change');

// VIEW USER

router.get('/settings', checkIsAuth, (_req, res) => {
  res.render('pages/settings', { title: 'User Settings' });
});

// NEW USER REGISTRATIONB

router.get('/reigster', (_req, res) => {
  return res.render('pages/register', { title: 'Register' });
});
router.post('/register', validateUser, (req, res) => {
  return registerUser(req, res, { title: 'Register' });
});

// USER LOGIN & LOGOUT

router.get('/login', (_req, res) => {
  return res.render('pages/login', { title: 'Login' });
});
router.post('/login', (req, res, next) => {
  return passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/user/login',
    failureFlash: 'Invalid username or password.'
  })(req, res, next);
});
router.get('/logout', checkIsAuthForReset, (req, res) => {
  req.logout();
  req.flash('success', 'You have been logged out.');
  return res.redirect('/user/login');
});

// PASSWORD REEST

router.get('/reset', checkIsNotAuth, (_req, res) => {
  return res.render('pages/reset', { title: 'Reset Password' });
});
router.post('/reset', checkIsNotAuth, validateReset, (req, res) => {
  return resetPassword(req, res, { title: 'Reset Password' });
});

// NEW PASSWORD AFTER RESET

router.get('/new-password', checkIsAuthForReset, (req, res) => {
  const { tempPassword } = req.user;
  if (!tempPassword) {
    return res.redirect('/user');
  }
  return res.render('pages/new-password', {
    title: 'New Password'
  });
});
router.post(
  '/new-password',
  checkIsAuthForReset,
  validateNewPassword,
  (req, res) => {
    return newPassword(req, res, { title: 'New Password' });
  }
);

// USER SETTINGS CHANGES

router.post('/change', checkIsAuth, validateChange, (req, res) => {
  return change(req, res);
});

module.exports = router;
