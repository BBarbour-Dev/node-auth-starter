const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  checkIsAuth,
  checkIsAuthForReset,
  checkIsNotAuth
} = require("../../middleware/auth");

// VALIDATORS

const validateAccount = require("./validators/validate-account");
const validateRecover = require("./validators/validate-reset");
const validateReset = require("./validators/validate-new-password");

// ROUTE HANDLERS

const newAccount = require("./handlers/new");
const resetPassword = require("./handlers/reset");
const newPassword = require("./handlers/new-password");

// VIEW ACCOUNT

router.get("/", checkIsAuth, (_req, res) =>
  res.render("pages/account", { title: "Account" })
);

// NEW ACCOUNT

router.get("/new", (_req, res) =>
  res.render("pages/account-new", { title: "New Account" })
);
router.post("/new", validateAccount, (req, res) =>
  newAccount(req, res, { title: "New Account" })
);

// ACCOUNT LOGIN & LOGOUT

router.get("/login", (_req, res) =>
  res.render("pages/account-login", { title: "Login" })
);
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/account",
    failureRedirect: "/account/login",
    failureFlash: "Invalid username or password."
  })(req, res, next);
});
router.get("/logout", checkIsAuth, (req, res) => {
  req.logout();
  req.flash("success", "You are logged out.");
  res.redirect("/account/login");
});

// PASSWORD REEST

router.get("/reset", checkIsNotAuth, (_req, res) => {
  res.render("pages/account-reset", { title: "Reset Password" });
});
router.post("/reset", checkIsNotAuth, validateRecover, (req, res) =>
  resetPassword(req, res, { title: "Reset Password" })
);

// NEW PASSWORD AFTER RESET

router.get("/new-password", checkIsAuthForReset, (req, res) => {
  const { tempPassword } = req.user;
  if (!tempPassword) {
    return res.redirect("/account");
  }
  return res.render("pages/account-new-password", { title: "New Password" });
});
router.post("/new-password", checkIsAuthForReset, validateReset, (req, res) => {
  newPassword(req, res, { title: "New Password" });
});

module.exports = router;
