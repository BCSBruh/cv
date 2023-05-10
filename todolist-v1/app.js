const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

let items = [];

app.post("/", function (req, res) {
  let text = req.body.newItem;
  items.push(text);

  res.redirect("/");
});

app.get("/", function (req, res) {
  var today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { kindOfDay: day, newListItem: items });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
