const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://testuser:testuser123@adityacluster.uzbzzwf.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  // res.json("Test OK");
  const { username, password } = req.body;
  const createdUser = await User.create({ username, password });
  res.json({ requestData: createdUser });
});

app.listen(4000);
