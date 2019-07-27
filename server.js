const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.use("/static", express.static(path.join(__dirname, "site", "static")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "site", "index.html"));
});

app.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname, "site", "login.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
