const mongoose = require('mongoose');
const { mongoURI } = require('./env-vars');

module.exports = async function() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Mongo DB connected...');
  } catch (err) {
    console.error(err);
  }
};
