const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  location: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
  },
  isBought: {
    type: Boolean,
    default: false,

  },
  latlong: {
    type: String,
    required: true,
    trim: true,
  },
  aana: {
    type: Number,
    required: false,
  },
  road: {
    type: Number,
    required: false,
  },
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property; 