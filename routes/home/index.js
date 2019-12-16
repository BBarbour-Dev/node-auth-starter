const express = require('express');
const router = express.Router();
const { checkIsAuth, checkIsNotAuth } = require('../../middleware/auth');

router.get('/', checkIsNotAuth, (_req, res) => {
  return res.render('pages/landing');
});

router.get('/dashboard', checkIsAuth, (_req, res) => {
  return res.render('pages/dashboard');
});

module.exports = router;
