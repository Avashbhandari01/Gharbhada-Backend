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

// Get searched properties
propertyRouter.get("/api/property/search", auth, async (req, res) => {
  const { name } = req.body;

  // Validate the name parameter
  if (!name) {
    return res.status(400).json({ error: "Name parameter is required" });
  }

  try {
    // Find properties with names that match the search term
    const regex = new RegExp(name);
    console.log("Search regex:", regex);

    const properties = await Property.find({ name: { $regex: regex } });

    // Check for empty results
    if (!properties.length) {
      return res.json({ message: "No properties found matching the search term." });
    }

    res.json({
      properties
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get searched properties by location
propertyRouter.get("/api/property/search", auth, async (req, res) => {
  const { location } = req.body;

  // Validate the name parameter
  if (!location) {
    return res.status(400).json({ error: "Name parameter is required" });
  }

  try {
    // Find properties with names that match the search term
    const regex = new RegExp(location);
    console.log("Search regex:", regex);

    const properties = await Property.find({ location: { $regex: regex } });

    // Check for empty results
    if (!properties.length) {
      return res.json({ message: "No properties found matching the search term." });
    }

    res.json({
      properties
    });
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