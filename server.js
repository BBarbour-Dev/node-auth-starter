// PACKAGE & MODULE IMPORTS
require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const connectMongo = require("./config/connect-mongo");
const hbsHelpers = require("./views/hbs-helpers");

// GLOBAL VARIABLES

const port = process.env.PORT || 5000;

// DATABASE CONNECTION

const db = connectMongo();

// MIDDLEWARES

app.use(express.urlencoded({ extended: true }));

// VIEW ENGINE

app.engine(
  ".hbs",
  exphbs({ defaultLayout: "main", extname: ".hbs", helpers: hbsHelpers })
);
app.set("view engine", "hbs");

// STATIC FILES

app.use("/public", express.static(path.join(__dirname, "public")));

// ROUTERS

const accountRouter = require("./routes/account");

// ROUTES

app.get("/", (_req, res) => {
  res.render("pages/index", { title: "Home" });
});
app.use("/account", accountRouter);

// LISTENER

app.listen(port, () => console.log(`Server listening on port ${port}...`));
