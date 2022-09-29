const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://prakash:prakash@cluster0.i7uqzpf.mongodb.net/E-commerce?retryWrites=true&w=majority"
  );
};
