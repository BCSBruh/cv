const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const lodash = require("lodash");
const trunc = require(__dirname + "/truncate.js");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://BCSBruh:Dogman26@blog.yzwaere.mongodb.net/blogDB"
);

const app = express();

let posts = [];
let truncPosts = [];

const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  type: String,
});

const userSchema = new mongoose.Schema({
  userName: String,
  userPassword: String,
  userType: Number,
});

const BlogPost = mongoose.model("BlogPost", blogSchema);
const User = mongoose.model("User", userSchema);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const homeStartingContent =
  "Welcome to my blog website. Below you will find some of the blogs I have written during my journey through college and learning Web Development. I am currently in college and one semester away from graduating.";
const aboutContent =
  "This website was made by myself and with the help of Dr. Angela Yu.";
const contactContent = "Contact me at the following locations:";

app.get("/", function (req, res) {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    truncPosts: truncPosts,
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/posts/:post", function (req, res) {
  posts.forEach(function (i) {
    if (lodash.lowerCase(req.params.post) === lodash.lowerCase(i.title)) {
      res.render("post", { postTitle: i.title, postBody: i.body });
    }
  });
});

app.post("/compose", function (req, res) {
  // let post = {
  //   title: req.body.composedTitle,
  //   body: req.body.composedBody,
  // };

  // let truncPost = {
  //   title: req.body.composedTitle,
  //   body: trunc.truncate(req.body.composedBody),
  //   lowerTitle: "/posts/" + lodash.kebabCase(req.body.composedTitle),
  // };

  let postTitle = req.body.composedTitle;
  let postBody = req.body.composedBody;

  // Save the post to the database
  BlogPost.findOne({ title: postTitle }).then((post) => {
    if (post === null) {
      let post = new BlogPost({
        title: postTitle,
        body: postBody,
        type: "blogPost",
      });

      post.save();
      res.redirect("/");
    } else {
      // Create Error message
      res.redirect("/");
    }
  });

  // posts.push(post);
  // truncPosts.push(truncPost);
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
