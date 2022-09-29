const mongoose = require("mongoose");
require("dotenv").config();
// console.log(process.env);

module.exports = () => {
  return mongoose.connect(process.env.MONGO_URL);
};
