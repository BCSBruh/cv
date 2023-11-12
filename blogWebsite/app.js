const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const lodash = require("lodash");
const trunc = require(__dirname + "/truncate.js");
const mongoose = require("mongoose");

mongoose.connect(
  env.URI;
);

const app = express();

const blogPostSchema = new mongoose.Schema({
  title: String,
  kebabTitle: String,
  body: String,
  truncBody: String,
  type: String,
});

const userSchema = new mongoose.Schema({
  userName: String,
  userPassword: String,
  userType: Number,
});

const blogSchema = new mongoose.Schema({
  category: String,
  posts: [blogPostSchema]
})

const BlogPost = mongoose.model("BlogPost", blogPostSchema);
const User = mongoose.model("User", userSchema);
const Blog = mongoose.model("Blog", blogSchema)

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
  BlogPost.find().then((blogs) => {
    if (blogs.length === 0) {
      res.render("home", {
        homeStartingContent: homeStartingContent,
        blogPosts: [],
      });
    } else {
      res.render("home", {
        homeStartingContent: homeStartingContent,
        blogPosts: blogs,
      });
    }
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
  // Find the one post that matches the kebab title
  BlogPost.findOne({kebabTitle: req.params.post}).then((post) => {
    if (post === null) {
      // Create Error message
      res.redirect("/");
    } else {
      res.render("post", {postTitle: post.title, postBody: post.body})
    }
  })


});

app.post("/compose", function (req, res) {
  let postTitle = req.body.composedTitle;
  let postBody = req.body.composedBody;

  // Save the post to the database
  BlogPost.findOne({ title: postTitle }).then((post) => {
    if (post === null) {
      var blog = new Blog ({
        category: "Daily",
      })

      if (postBody.length < 100) {
        let post = new BlogPost({
          title: postTitle,
          kebabTitle: lodash.kebabCase(postTitle),
          body: postBody,
          truncBody: postBody,
          type: "blogPost",
        });

        post.save();
        blog.posts.push(post);
        blog.save();
      } else {
        let post = new BlogPost({
          title: postTitle,
          kebabTitle: lodash.kebabCase(postTitle),
          body: postBody,
          truncBody: trunc.truncate(postBody),
          type: "blogPost",
        });

        post.save();
        blog.posts.push(post);
        blog.save();
      }
      res.redirect("/");
    } else {
      res.redirect("/posts/" + post.kebabTitle);
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
