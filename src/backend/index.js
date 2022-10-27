const express = require("express");
const cors = require("cors");

const userController = require("./controllers/users.controller");
const prodController = require("./controllers/products.controller");
const { register, login } = require("./controllers/auth.controller");
const cartController = require("./controllers/cart.controller");
const addressController = require("./controllers/address.controller");
const orderController = require("./controllers/order.controller");

const connect = require("./configs/db");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/login", login);
app.use("/register", register);
app.use("/users", userController);
app.use("/products", prodController);
app.use("/carts", cartController);
app.use("/addresses", addressController);
app.use("/orders", orderController);

app.listen("2345", async () => {
  try {
    await connect();
    console.log("listening on port 2345");
  } catch (error) {
    console.log(error.message);
  }
});
