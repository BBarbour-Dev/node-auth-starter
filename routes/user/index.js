const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  checkIsAuth,
  checkIsAuthForReset,
  checkIsNotAuth
} = require("../../middleware/auth");

// VALIDATORS

const validateUser = require("./validators/register");
const validateReset = require("./validators/reset");
const validateNewPassword = require("./validators/new-password");
const validateUsernameChange = require("./validators/change-username");
const validateEmailChange = require("./validators/change-email");
const validatePasswordChange = require("./validators/change-password");

// ROUTE HANDLERS

const registerUser = require("./handlers/register");
const resetPassword = require("./handlers/reset");
const newPassword = require("./handlers/new-password");
const changeUsername = require("./handlers/change-username");
const changeEmail = require("./handlers/change-email");
const changePassword = require("./handlers/change-password");

// VIEW USER

router.get("/settings", checkIsAuth, (_req, res) => {
  res.render("pages/settings", { title: "Account Settings" });
});

// NEW USER REGISTRATIONB

router.get("/reigster", (_req, res) => {
  return res.render("pages/register", { title: "Register" });
});
router.post("/register", validateUser, (req, res) => {
  return registerUser(req, res, { title: "Register" });
});

// USER LOGIN & LOGOUT

router.get("/login", (_req, res) => {
  return res.render("pages/login", { title: "Login" });
});
router.post("/login", (req, res, next) => {
  return passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/user/login",
    failureFlash: "Invalid username or password."
  })(req, res, next);
});
router.get("/logout", checkIsAuthForReset, (req, res) => {
  req.logout();
  req.flash("success", "You have been logged out.");
  return res.redirect("/user/login");
});

// PASSWORD REEST

router.get("/reset", checkIsNotAuth, (_req, res) => {
  return res.render("pages/reset", { title: "Reset Password" });
});
router.post("/reset", checkIsNotAuth, validateReset, (req, res) => {
  return resetPassword(req, res, { title: "Reset Password" });
});

// NEW PASSWORD AFTER RESET

router.get("/new-password", checkIsAuthForReset, (req, res) => {
  const { tempPassword } = req.user;
  if (!tempPassword) {
    return res.redirect("/user");
  }
  return res.render("pages/new-password", {
    title: "New Password"
  });
});
router.post(
  "/new-password",
  checkIsAuthForReset,
  validateNewPassword,
  (req, res) => {
    return newPassword(req, res, { title: "New Password" });
  }
);

// USER SETTINGS CHANGES

router.post(
  "/change-username",
  checkIsAuth,
  validateUsernameChange,
  (req, res) => {
    return changeUsername(req, res);
  }
);
router.post("/change-email", checkIsAuth, validateEmailChange, (req, res) => {
  return changeEmail(req, res);
});
router.post(
  "/change-password",
  checkIsAuth,
  validatePasswordChange,
  (req, res) => {
    return changePassword(req, res);
  }
);

module.exports = router;
