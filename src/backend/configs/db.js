const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async () => {
  return mongoose.connect(
    process.env.MONGO_URI
    // ,
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // },
    // () => {
    //   console.log("mongdb is connected");
    // }
  );
};
