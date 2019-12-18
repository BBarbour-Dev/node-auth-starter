const passportLocal = require("passport-local");
const User = require("../models/User");
const { checkPassword } = require("../helpers/password");

const LocalStrategy = passportLocal.Strategy;

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      let user = await User.findOne({ username });

      if (!user) {
        return done(null, false);
      }

      const today = new Date();
      const expirationDate = new Date(user.tempPasswordExpires);

      if (today > expirationDate) {
        await user.updateOne({
          tempPassword: null,
          tempPasswordExpires: null
        });
        user = await User.findOne({ username });
      }

      const passwordMatch = await checkPassword(password, user.password);
      const tempPasswordMatch = password === user.tempPassword;

      if (passwordMatch && !tempPasswordMatch) {
        await user.updateOne({
          tempPassword: null,
          tempPasswordExpires: null
        });
      }

      if (!passwordMatch && !tempPasswordMatch) {
        return done(null, false);
      }

      return done(null, user);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    if (!user) {
      done("Server error. Please try again.", user);
    }
    done(null, user);
  });
};
