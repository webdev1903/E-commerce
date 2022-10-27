const express = require("express");

const router = express.Router();

const Order = require("../models/order.model");

const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const obj = { ...req.body, user_id: req.user._id };
    const order = await Order.create(obj);
    return res.status(201).send(order);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(201).send(order);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    return res.status(201).send(order);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
