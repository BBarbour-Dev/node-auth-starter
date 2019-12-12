const mongoose = require("mongoose");

module.exports = async function() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("Mongo DB connected...");
  } catch (err) {
    console.error(err);
  }
};
