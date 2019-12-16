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
const validateReset = require("./validators/validate-reset");
const validateNewPassword = require("./validators/validate-new-password");
const validateChange = require("./validators/validate-change");

// ROUTE HANDLERS

const newAccount = require("./handlers/new");
const reset = require("./handlers/reset");
const tempPassword = require("./handlers/temp-password");
const resetPassword = require("./handlers/reset-password");
const change = require("./handlers/change");

// VIEW ACCOUNT

router.get("/", checkIsAuth, (_req, res) => {
  res.render("pages/account", { title: "Account" });
});

// NEW ACCOUNT

router.get("/new", (_req, res) => {
  return res.render("pages/account-new", { title: "New Account" });
});
router.post("/new", validateAccount, (req, res) => {
  return newAccount(req, res, { title: "New Account" });
});

// ACCOUNT LOGIN & LOGOUT

router.get("/login", (_req, res) => {
  return res.render("pages/account-login", { title: "Login" });
});
router.post("/login", (req, res, next) => {
  return passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/account/login",
    failureFlash: "Invalid username or password."
  })(req, res, next);
});
router.get("/logout", checkIsAuthForReset, (req, res) => {
  req.logout();
  req.flash("success", "You are logged out.");
  return res.redirect("/account/login");
});

// PASSWORD REEST

router.get("/reset", checkIsNotAuth, (_req, res) => {
  return res.render("pages/account-reset", { title: "Reset Password" });
});
router.post("/reset", checkIsNotAuth, validateReset, (req, res) => {
  return reset(req, res, { title: "Reset Password" });
});

// NEW PASSWORD AFTER RESET

router.get("/reset-password", checkIsAuthForReset, (req, res) => {
  return tempPassword(req, res);
});
router.post(
  "/reset-password",
  checkIsAuthForReset,
  validateNewPassword,
  (req, res) => {
    return resetPassword(req, res, { title: "Reset Password" });
  }
);

// ACCOUNT CHANGES

router.post("/change", checkIsAuth, validateChange, (req, res) => {
  return change(req, res);
});

module.exports = router;
