const express = require("express");
const router = express.Router();

const Product = require("../models/product.model");

// router.get("/:params", async (req, res) => {
//   try {
//     console.log(params);
//   } catch (error) {}
// });

router.get("/", async (req, res) => {
  try {
    const qtitle = req.query.title;
    const page = req.query.page || 1;
    const limit = req.query.limit || 8;
    const offset = (page - 1) * 10;
    const products = await Product.find()
      .skip(offset)
      .limit(limit)
      .lean()
      .exec();
    let filtered;
    if (qtitle) {
      const newprods = await Product.find().lean().exec();
      filtered = newprods.filter((e) => {
        let Title = e.title.toLowerCase();
        let ntitle = qtitle.toLowerCase();
        if (Title.startsWith(ntitle)) return e;
      });
      return res.status(200).send(filtered);
    }
    const pages = Math.ceil((await Product.find().countDocuments()) / limit);
    return res.status(200).send({ products, pages });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
