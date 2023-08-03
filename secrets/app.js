const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect(
  "mongodb+srv://BCSBruh:Dogman26@blog.yzwaere.mongodb.net/userDB"
);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const secret = "here is a secret string to encrypt the data";

userSchema.plugin(encrypt, {
  secret: secret,
  encryptedFields: ["password"],
});

const User = mongoose.model("User", userSchema);

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });

  newUser.save().then((err) => {
    res.render("secrets");
  });
});

app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ email: username }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.render("secrets");
      }
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
