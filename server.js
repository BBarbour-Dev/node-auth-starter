const path = require("path");
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const connectMongo = require("./config/connectMongo");

connectMongo();

//MIDDLEWARES
app.use(express.urlencoded());
app.use(expressLayouts);
app.set("view engine", "ejs");

//Static Files
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
  res.render("pages/index", { title: "Home" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
