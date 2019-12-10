const path = require("path");
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const connectMongo = require("./config/connectMongo");

connectMongo();

//MIDDLEWARES
app.use(express.urlencoded({ extended: true }));

//VIEW ENGINE
const hbsHelpers = require("./views/hbs-helpers");
app.engine(
  ".hbs",
  exphbs({ defaultLayout: "main", extname: ".hbs", helpers: hbsHelpers })
);
app.set("view engine", "hbs");

//STATIC FILES
app.use("/public", express.static(path.join(__dirname, "public")));

//ROUTES
const accountRouter = require("./routes/account");

app.get("/", (_req, res) => {
  res.render("pages/index", { title: "Home" });
});
app.use("/account", accountRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
