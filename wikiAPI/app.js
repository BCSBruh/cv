const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("Article", articleSchema);

////////////////////////////////////////////////////////Requests target all routes////////////////////////////////////////////////////////

app
  .route("/articles")
  .get(function (req, res) {
    Article.find().then((articles) => {
      res.send(articles);
    });
  })
  .post(function (req, res) {
    let title = req.body.title;
    let content = req.body.content;

    let newArticle = new Article({
      title: title,
      content: content,
    });

    newArticle.save();
  })
  .delete(function (req, res) {
    Article.deleteMany({}).catch(function (err) {
      console.log(err);
    });
  });

////////////////////////////////////////////////////////Requests target all routes////////////////////////////////////////////////////////
app
  .route("/articles/:articleTitle")
  .get(function (req, res) {
    Article.findOne({ title: req.params.articleTitle }).then((article) => {
      res.send(article);
    });
  })
  .put(function (req, res) {
    Article.update(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true }
    ).catch(function (err) {
      res.send(err);
    });

    res.send("Succesfully updated article");
  })
  .patch(function (req, res) {
    Article.update(
      { title: req.params.articleTitle },
      { $set: req.body }
    ).catch(function (err) {
      res.send(err);
    });

    res.send("Succesfully updated the article");
  })
  .delete(function (req, res) {
    Article.deleteOne({ title: req.params.articleTitle }).catch(function (err) {
      res.send(err);
    });
    res.send("Succesfully deleted article");
  });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
