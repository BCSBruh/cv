const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];
let workItems = [];

app.post("/", function (req, res) {
  let text = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(text);
    res.redirect("/work");
  } else {
    items.push(text);
    res.redirect("/");
  }
});

app.get("/", function (req, res) {
  let day = date.getDate();

  res.render("list", { listTitle: day, newListItem: items });
});

app.post("/work", function (req, res) {
  let item = req.body.newItem;

  workItems.push(item);

  res.redirect("/work");
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work", newListItem: workItems });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
