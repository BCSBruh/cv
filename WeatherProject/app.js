const express = require("express");
const https = require("https");
const parser = require("body-parser");

let url =
  "https://api.openweathermap.org/data/2.5/weather?lat=32.44&lon=-81.78&units=imperial&appid=aa0a6ff53952c92b54681d46821ccd3f";

const app = express();

app.use(parser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const lat = "32.44";
  const long = "-81.78";
  const units = req.body.cityName;
  const apiKey = "aa0a6ff53952c92b54681d46821ccd3f";

  url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    long +
    "&units=" +
    units +
    "&appid=" +
    apiKey;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const icon =
        "https://openweathermap.org/img/wn/" +
        weatherData.weather[0].icon +
        "@2x.png";

      res.write("<h1>The weather is currently " + weatherDesc + "</h1>");
      res.write(
        "<h1>The temperature in Statesboro is " + temp + " " + units + "</h1>"
      );
      res.write('<img src="' + icon + '" alt="weather icon">');
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000.");
});
