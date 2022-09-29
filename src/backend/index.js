const express = require("express");
const cors = require("cors");

const userController = require("./controllers/users.controller");
const prodController = require("./controllers/products.controller");

const connect = require("./configs/db");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userController);
app.use("/products", prodController);

app.listen("2345", async () => {
  try {
    await connect();
    console.log("listening on port 2345");
  } catch (error) {
    console.log(error.message);
  }
});
