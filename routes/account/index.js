const express = require("express");
const router = express.Router();

// VALIDATORS

const validateAccount = require("./validators/validate-account");

// HANDLERS

const newAccount = require("./handlers/new-account");
const login = require("./handlers/login");

// ROUTES

router.get("/new", (_req, res) =>
  res.render("pages/new-account", { title: "New Account" })
);

router.post("/new", validateAccount, (req, res) =>
  newAccount(req, res, { title: "New Account" })
);

router.get("/login", (req, res) => login(req, res, { title: "Login" }));

module.exports = router;
