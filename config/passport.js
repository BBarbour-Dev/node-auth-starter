const passportLocal = require("passport-local");
const Account = require("../models/Account");
const bcrypt = require("bcryptjs");

const LocalStrategy = passportLocal.Strategy;

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const account = await Account.findOne({ username });
      if (!account) {
        return done(null, false);
      }

      const passwordMatch = await bcrypt.compare(password, account.password);
      if (!passwordMatch) {
        return done(null, false);
      }
      return done(null, account);
    })
  );

  passport.serializeUser((account, done) => {
    done(null, account._id);
  });

  passport.deserializeUser(async (id, done) => {
    const account = await Account.findById(id);
    done("Server error.", account);
  });
};
