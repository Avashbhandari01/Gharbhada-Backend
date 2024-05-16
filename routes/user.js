//Edit user profile
const express = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const Property = require("../models/property");

userRouter.patch("/edit-profile", auth, async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(req.user, { name }, { new: true });
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get all informations of a user by id
userRouter.get("/user/:_id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
);


module.exports = userRouter;


