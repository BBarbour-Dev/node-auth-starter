const express = require("express");
const router = express.Router();

// Handlers
const newAccount = require("./handlers/new-account");

router.get("/new", (_req, res) =>
  res.render("pages/new-account", { title: "New Account" })
);

router.post("/new", (req, res) =>
  newAccount(req, res, { title: "New Account" })
);

module.exports = router;
