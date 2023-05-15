const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const lodash = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://BCSBruh:Dogman26@blog.yzwaere.mongodb.net/todolistDB"
);

const itemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Item 1",
});

const item2 = new Item({
  name: "Item 2",
});

const item3 = new Item({
  name: "Item 3",
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemSchema],
};

const List = mongoose.model("List", listSchema);

let workItems = [];

app.post("/", function (req, res) {
  let text = req.body.newItem;
  let listName = req.body.list;

  let newItem = new Item({
    name: text,
  });

  if (listName === "Today") {
    newItem.save();

    res.redirect("/");
  } else {
    List.findOne({ name: listName }).then((list) => {
      list.items.push(newItem);
      list.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function (req, res) {
  const itemID = req.body.deleteItem;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.deleteOne({ _id: itemID }).then((result) => {
      res.redirect("/");
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: itemID } } }
    ).then((list) => {
      res.redirect("/" + listName);
    });
  }
});

app.get("/", function (req, res) {
  Item.find().then((items) => {
    if (items.length === 0) {
      Item.bulkSave([item1, item2, item3]);
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItem: items });
    }
  });
});

app.post("/work", function (req, res) {
  let item = req.body.newItem;

  workItems.push(item);

  res.redirect("/work");
});

app.get("/:list", function (req, res) {
  const customListName = lodash.capitalize(req.params.list);

  List.findOne({ name: customListName }).then((list) => {
    if (list === null) {
      const list = new List({
        name: customListName,
        items: defaultItems,
      });

      list.save();
      res.redirect("/" + customListName);
    } else {
      res.render("list", { listTitle: list.name, newListItem: list.items });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
