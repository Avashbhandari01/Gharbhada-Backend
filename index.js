// import ffrom packages
const express = require("express");
const mongoose = require("mongoose");
//cors
const cors = require("cors");
//import from files
const authRouter = require("./routes/auth");

const adminRouter = require("./routes/admin");
const propertyRouter = require("./routes/property");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const Message = require("./models/messages");

//init
const PORT = 5123;
const DB =
  //"mongodb+srv://bistsaniya:2076Asoj21!@cluster0.kfmu6iu.mongodb.net/?retryWrites=true";
  "mongodb+srv://avash115:4birHfRkHpOPtV8E@ghat-bhada-db.cwrkkex.mongodb.net/?retryWrites=true";

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(adminRouter);
app.use(propertyRouter);
app.use(userRouter);
app.use(orderRouter);
app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Send a new message
app.post("/messages", async (req, res) => {
  try {
    const { sender, text } = req.body;
    const newMessage = new Message({
      sender,
      text,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//connection
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection successful");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`conected at port ${PORT}`);
});
