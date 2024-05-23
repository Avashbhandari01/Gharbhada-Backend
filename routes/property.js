const express = require('express');
const auth = require('../middlewares/auth');
const Property = require('../models/property');

const propertyRouter = express.Router();


//Get all Properties

propertyRouter.get("/api/property", auth, async (req, res) => {
  try {
    const properties = await Property.find({ isBought: false });
    res.json(properties);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Combined search for properties by name or location
propertyRouter.get("/api/property/search", async (req, res) => {
  const { search } = req.body;

  // Validate the search parameter
  if (!search) {
    return res.status(400).json({ error: "Search parameter is required" });
  }

  try {
    const regex = new RegExp(search, "i");
    console.log("Search regex:", regex);

    // Find properties that match the search term in either name or location
    const properties = await Property.find({
      $or: [
        { name: { $regex: regex } },
        { location: { $regex: regex } }
      ]
    });

    // Check for empty results
    if (!properties.length) {
      return res.json({ message: "No properties found matching the search term." });
    }

    res.json({ properties });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get a single property
propertyRouter.get("/api/property/:_id", auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params._id);
    res.json(property);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = propertyRouter;