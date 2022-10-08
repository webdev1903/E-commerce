const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findById(req.params.id).lean().exec();
    // console.log(user);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    console.log(req.body);
    // const { cart } = req.body;
    // if (cart) {
    //   const item = await User.findByIdAndUpdate(req.params.id, { cart });
    //   return res.status(201).send(item);
    // }
    // console.log(req.params.id, req.body);
    const item = await User.findByIdAndUpdate(req.params.id, {
      $push: { cart: req.body },
    });
    return res.status(201).send(item);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.patch("/:id/cart", async (req, res) => {
  try {
    console.log(req.body);
    const item = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).send(item);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
