const Message = require('../models/messages');
const User = require('../models/user');

// Example of getMessages function in controller for reference
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().populate('sender', 'name email').populate('recipient', 'name email').sort({ timestamp: -1 }).limit(50);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const sendMessage = async (req, res) => {
    try {
        const { sender, recipient, text } = req.body;

        const senderData = await User.findById(sender);
        const recipientData = await User.findById(recipient);

        const newMessage = new Message({
            sender: senderData,
            recipient: recipientData,
            text,
        });
        await newMessage.save();
        res.json(true);
    } catch (error) {
        console.error("Error saving message:", error);
    }
};

module.exports = {
    getMessages,
    sendMessage
}
