// init project
var express = require("express");
var app = express();
var dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", function (req, res) {
  const date = new Date();
  res.send({ unix: Math.floor(date.getTime()), utc: date.toString() });
});

app.get("/api/:date", function (req, res) {
  const convertDate = dayjs.utc(Number(req.params.date) || req.params.date);
  if (convertDate.toString() == "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }
  res.json({
    unix:
      Number(req.params.date) > 0
        ? Number(req.params.date)
        : convertDate.valueOf(),
    utc: convertDate.format("ddd, DD MMM YYYY HH:mm:ss [GMT]"),
  });
});

// // Listen on port set in environment variable or default to 3000
// var listener = app.listen(process.env.PORT || 3000, function () {
//   console.log("Your app is listening on port " + listener.address().port);
// });
module.exports.handler = serverless(app);

