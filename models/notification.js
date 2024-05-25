const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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
    message: {
        type: String,
        required: true,
        trim: true,
    },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;