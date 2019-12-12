const express = require("express");
const router = express.Router();
const passport = require("passport");

// ROUTE HANDLERS

const newAccount = require("./handlers/new-account");
const login = require("./handlers/login");

// VALIDATORS

const validateAccount = require("./validators/validate-account");

// NEW ACCOUNT

router.get("/new", (_req, res) =>
  res.render("pages/new-account", { title: "New Account" })
);
router.post("/new", validateAccount, (req, res) =>
  newAccount(req, res, { title: "New Account" })
);

// ACCOUNT LOGIN

router.get("/login", (_req, res) =>
  res.render("pages/login", { title: "Login" })
);
router.post("/login", (req, res) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/account/login",
    failureFlash: true
  })(req, res, next);
});

module.exports = router;
