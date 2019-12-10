const mongoose = require("mongoose");

module.exports = async function() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database connected...");
  } catch (err) {
    console.error(err);
  }
};
