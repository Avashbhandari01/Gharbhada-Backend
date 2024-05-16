const express = require("express");
const Property = require("../models/property");
// const admin = require('../middlewares/admin');

const adminRouter = express.Router();

adminRouter.post("/admin/add-property", async (req, res) => {
  try {
    const { name, description, images, location, price, latlong } = req.body;

    let property = new Property({
      name,
      description,
      images,
      location,
      price,
      latlong
    });
    property = await property.save();
    res.json(property);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Get-all products
adminRouter.get("/admin/get-properties", async (req, res) => {
  try {
    const properties = await Property.find({});
    res.json(properties);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// delete a product
adminRouter.post("/admin/delete-property", async (req, res) => {
  try {
    const { id } = req.body;
    let property = await Property.findByIdAndDelete(id);

    res.json(property);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = adminRouter;
