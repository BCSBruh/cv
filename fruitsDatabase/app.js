const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB");

// Below is replaced by the upper two lines
// const url = "mongodb://localhost:27017";

// const dbName = "fruitsDB";

// const client = new MongoClient(url, { useNewUrlParser: true });

// client.connect(function(err) {
//     assert.equal(null, err);
//     console.log("Connected to server");

//     const db = client.db(dbName);

//     findDocuments(db, function() {
//         client.close();
//     });
// });

// We can add validation to the schema instead of just accepting regular numbers
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

// const fruitSchema = new mongoose.Schema({
//   name: String,
//   rating: Number,
//   review: String,
// });

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 8,
  review: "Great fruit",
});

// fruit.save();

// The code below is replaced by the above using mongoose

// const insertDocuments = function (db, callback) {
//   const collection = db.collection("fruits");

//   collection.insertMany(
//     [
//       {
//         name: "Apple",
//         score: 8,
//         review: "Great fruit",
//       },
//       {
//         name: "Orange",
//         score: 6,
//         review: "Kinda sour",
//       },
//     ],
//     function (err, result) {
//       assert.equal(err, null);
//       assert.equal(3, result.result.n);
//       assert.equal(3, result.ops.length);
//       console.log("Inserted 3 documents into the collection");
//       callback(result);
//     }
//   );
// };

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema,
});

const People = mongoose.model("person", personSchema);

const person = new People({
  name: "James",
  age: 32,
});

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "Cool ass fruit",
});

const orange = new Fruit({
  name: "Orange",
  rating: 5,
  review: "They aight",
});

const banana = new Fruit({
  name: "Banana",
  rating: 1,
  review: "This is the biggest piece of dog shit",
});

// Fruit.updateOne({ name: "Orange" }, { rating: 5 }).then((result) => {
//   mongoose.connection.close();
// });

// Fruit.deleteOne({ name: "Banana" }).then((result) => {
//   mongoose.connection.close();
// });

// Fruit.find().then((fruits) => {
//   fruits.forEach(function (i) {
//     console.log(i.name);
//   });

//   mongoose.connection.close();
// });

People.updateOne({ name: "James" }, { favouriteFruit: kiwi }).then((result) => {
  mongoose.connection.close();
});
