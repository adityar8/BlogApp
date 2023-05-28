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
const multer = require("multer");
const fs = require("fs");
// Upload the files to uploads folder in api proj
const uploadMiddleware = multer({ dest: "uploads/" });

const cookieParser = require("cookie-parser");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
// add cookie parser, to read and validate  coookie sent from front end.
app.use(cookieParser());
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
          res.cookie("token", token).json({
            id: userDoc._id,
            username,
          });
        }
      );
    } else {
      res.json("Invalid");
    }
  } catch (err) {
    res.status(400).json(e);
  }
});

app.post("/logout", async (req, res) => {
  res.cookie("token", "").json("ok");
});

// Return profile.
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret_salt_session, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

//Multer library is use to grab file from form-data ( coming from client request)
app.post("/post", uploadMiddleware.single("file"), (req, res) => {
  // res.json({ files: req.file }); // 'file' in req.file is the name of the form element
  // console.log("Inside post", req.file);
  const { originalname, path } = req.file; // 'file' in req.file is the name of the form element coming from front end.
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  fs.renameSync(path, path + "." + ext);
  res.json({ ext });
});

app.listen(4000);
