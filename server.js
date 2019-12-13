// MODULE IMPORTS

require("dotenv").config();
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const connectMongo = require("./config/connect-mongo");
const hbsHelpers = require("./views/hbs-helpers");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

// SETUP

const app = express();
const port = process.env.PORT || 5000;
const passportConfig = require("./config/passport");
passportConfig(passport);

// DATABASE CONNECTION

connectMongo();

// MIDDLEWARE

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  next();
});

// TEMPLATE/VIEW ENGINE

app.engine(
  ".hbs",
  exphbs({ defaultLayout: "main", extname: ".hbs", helpers: hbsHelpers })
);
app.set("view engine", "hbs");

// SERVE STATIC FILES

app.use("/public", express.static(path.join(__dirname, "public")));

// ROUTERS

const accountRouter = require("./routes/account");

// APP ROUTES

app.get("/", (_req, res) => {
  res.render("pages/index", { title: "Home" });
});
app.use("/account", accountRouter);

// LISTENER

app.listen(port, () => console.log(`Server listening on port ${port}...`));
