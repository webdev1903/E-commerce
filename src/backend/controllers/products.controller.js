const express = require("express");
const router = express.Router();

const Product = require("../models/product.model");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().lean().exec();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
