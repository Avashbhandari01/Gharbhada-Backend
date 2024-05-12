const express = require('express');
const auth = require('../middlewares/auth');
const Property = require('../models/property');

const propertyRouter = express.Router();


//Get all Properties

propertyRouter.get("/api/property", auth, async (req, res) => {
    try {
      const properties = await Property.find({isBought: false});
      res.json(properties);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });


  // Get searched properties
  propertyRouter.get("/api/property/search/:name", auth, async (req, res) => {
    try {
      const properties = await Property.find({
        name: {$regex: req.params.name, $options: 'i'}
      });
      res.json(properties);
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