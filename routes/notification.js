const express = require("express");
const Notification = require("../models/notification");

const notificationRouter = express.Router();

notificationRouter.post("/api/get-notifications", async (req, res) => {
    try {
        const { userID } = req.body;

        const notifications = await Notification.find({ userID });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

notificationRouter.post("/api/notifications", async (req, res) => {
    try {
        const { name, userID, description, images, location, price, latlong, message } = req.body;

        let notification = new Notification({
            name,
            userID,
            description,
            images,
            location,
            price,
            latlong,
            message,
        });

        notification = await notification.save();

        res.json(notification);

    } catch (error) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = notificationRouter;