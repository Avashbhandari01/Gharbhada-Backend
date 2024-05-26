const express = require("express");
const Order = require("../models/order");
const Property = require("../models/property");
const User = require("../models/user");
const nodemailer = require('nodemailer');
const ObjectId = require("mongoose").Types.ObjectId;
const { promisify } = require('util');

require('dotenv').config();

const orderRouter = express.Router();

orderRouter.post("/api/order/:prop_id", async (req, res) => {
  const { userID } = req.body;
  try {
    let order = new Order({
      userID,
      propertyID: req.params.prop_id,
    });
    order = await order.save();

    const id = req.params.prop_id;

    await Property.updateOne({ _id: new ObjectId(id) }, { isBought: true });
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

orderRouter.get("/api/orders/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const orders = await Order.find({
      userID: new ObjectId(req.params.id),
    }).populate("propertyID");

    res.status(200).json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

orderRouter.get("/admin/get-orders", async (req, res) => {
  try {
    const orders = await Order.find({}).populate("propertyID");
    res.status(200).json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

orderRouter.put("/admin/confirmOrreject", async (req, res) => {
  try {
    const { id, status } = req.body;

    if (status === "rejected") {
      let order = await Order.findByIdAndDelete(id);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      await Property.updateOne(
        { _id: new ObjectId(order.propertyID) },
        { isBought: false }
      );

      return res.json(order);
    } else {
      let order = await Order.findById(id);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      order.status = "completed";
      order = await order.save();

      // Fetch user information
      const user = await User.findById(order.userID);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const userEmail = user.email;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.USER,
          pass: process.env.APP_PASSWORD,
        }
      });

      const sendMail = promisify(transporter.sendMail).bind(transporter);

      // Send confirmation email
      const mailOptions = {
        from: {
          name: 'Ghar Bhada',
          address: process.env.USER
        }, // Sender address
        to: userEmail,
        subject: "Order Confirmation",
        text: `Dear ${user.name},\n\nYour order has been confirmed and is now completed.\n\nThank you for your purchase!`
      };

      try {
        await sendMail(mailOptions);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

      order = await Order.findByIdAndDelete(id);
      return res.json(order);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// orderRouter.get('/api/order/:_id', auth, async(req, res) => {
//     try{
//         const order = await Order.findById(req.params._id);
//         res.json(order);
//     }catch(e){
//         res.status(500).json({error: e.message});
//     }
// })

module.exports = orderRouter;
