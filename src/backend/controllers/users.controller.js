const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

router.post("", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/:email", async (req, res) => {
  try {
    // console.log(req.params);
    const user = await User.findOne({ email: req.params.email }).lean().exec();
    // console.log(user);
    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
