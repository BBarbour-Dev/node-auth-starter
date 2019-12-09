const express = require("express");
const app = express();
const connectDb = require("./config/connectDb");

connectDb();

//MIDDLEWARES
app.use();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
