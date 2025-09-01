const express = require("express");
const cors = require("cors");

const app = express();

//Middleware
app.use(cors({ optionsSuccessStatus: 200 }));

//Simple homepage
app.get("/", (req, res) => {
  res.send("Timestamp Microservice - use /api/:date?");
});

//Helper to format respone
function buildResponse(date) {
  return {
    unix: date.getTime(),
    utc: date.toUTCString(),
  };
}

//Core route
app.get("/api/:date?", (req, res) => {
  let { date: input } = req.params;

  if (!input) {
    //No parameter -> current time
    return res.json(buildResponse(new Date()));
  }

  let date;
  if (/^-?\d+$/.test(input)) {
    date = new Date(Number(input));
  } else {
    date = new Date(input);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  return res.json(buildResponse(date));
});

module.exports = app;
