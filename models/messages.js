// Message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
  versionKey: false
});

messageSchema.index({ sender: 1, recipient: 1 });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
