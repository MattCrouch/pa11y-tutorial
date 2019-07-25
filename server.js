const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.use("/static", express.static("static"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "site", "index.html"));
});

app.get("/dashboard", function(req, res) {
  res.sendFile(path.join(__dirname, "site", "dashboard.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
