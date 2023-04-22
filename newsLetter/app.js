const express = require("express");
const https = require("https");
const parser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(parser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const fName = req.body.fname;
  const lName = req.body.lname;
  const email = req.body.email;
  const listID = "7dd67be552";
  const server = "us8";
  const url =
    "https://" + server + ".api.mailchimp.com/3.0/lists/" + listID + "/members";

  const options = {
    method: "POST",
    auth: "jerom:57973f2d618f34604f8038505282e81d-us8",
  };

  var data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: fName,
      LNAME: lName,
    },
  };

  var jsonData = JSON.stringify(data);

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});
