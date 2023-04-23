const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const e = require("express");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
// Salt to generate jwt for session
const secret_salt_session = "saodsad2323knkjn3432sdfdsf0090909mmb23231dffbb";
const app = express();
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://testuser:testuser123@adityacluster.uzbzzwf.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/register", async (req, res) => {
  // res.json("Test OK");
  const { username, password } = req.body;
  try {
    const createdUser = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json({ requestData: createdUser });
  } catch (err) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  // res.json("Test OK");
  try {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // res.json("success");
      // If the entered password is correct , generate a jwt token , create a cookie
      // and pass the cookie-token using the cookie and send it to the front end(browser)

      jwt.sign(
        { username, id: userDoc._id },
        secret_salt_session,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json("OK");
        }
      );
    } else {
      res.json("Invalid");
    }
  } catch (err) {
    res.status(400).json(e);
  }
});

app.listen(4000);
