const express = require("express");
const router = express.Router();
const passport = require("passport");

// ROUTE HANDLERS

const newAccount = require("./handlers/new");

// VALIDATORS

const validateAccount = require("./validators/validate-account");

// NEW ACCOUNT

router.get("/new", (_req, res) =>
  res.render("pages/account-new", { title: "New Account" })
);
router.post("/new", validateAccount, (req, res) =>
  newAccount(req, res, { title: "New Account" })
);

// ACCOUNT LOGIN

router.get("/login", (_req, res) =>
  res.render("pages/account-login", { title: "Login" })
);
router.post("/login", (req, res, next) => {
  console.log(next);
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/account/login",
    failureFlash: "Invalid username or password."
  })(req, res, next);
});

module.exports = router;
