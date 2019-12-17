const { check } = require("express-validator");

module.exports = [
  check("username").isLength({ min: 3 }),
  check("email").isEmail()
];
