const passportLocal = require("passport-local");
const Account = require("../models/Account");
const bcrypt = require("bcryptjs");

const LocalStrategy = passportLocal.Strategy;

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      let account = await Account.findOne({ username });

      if (!account) {
        return done(null, false);
      }

      const today = new Date();
      const expirationDate = new Date(account.tempPasswordExpires);

      if (today > expirationDate) {
        await account.updateOne({
          tempPassword: null,
          tempPasswordExpires: null
        });
        account = await Account.findOne({ username });
      }

      const passwordMatch = await bcrypt.compare(password, account.password);
      const tempPasswordMatch = password === account.tempPassword;

      if (passwordMatch && !tempPasswordMatch) {
        await account.updateOne({
          tempPassword: null,
          tempPasswordExpires: null
        });
      }

      if (!passwordMatch && !tempPasswordMatch) {
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
    if (!account) {
      done("Server error. Please try again.", account);
    }
    done(null, account);
  });
};
