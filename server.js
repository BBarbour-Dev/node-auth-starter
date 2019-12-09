const express = require("express");
const app = express();
const connectDb = require("./connectDb");

connectDb();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
