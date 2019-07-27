const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const port = 3000;

const COOKIE_NAME = "is-logged-in";

app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, "site", "static")));

app.get("/login", function(req, res) {
  if (req.cookies[COOKIE_NAME] === "1") {
    // Already logged in
    return res.redirect("/");
  }

  res.sendFile(path.join(__dirname, "site", "login.html"));
});

app.post("/login", function(req, res) {
  res.cookie(COOKIE_NAME, "1").redirect("/");
});

app.get("/logout", function(req, res) {
  res.clearCookie(COOKIE_NAME).redirect("/login");
});

app.get("/", function(req, res) {
  if (req.cookies[COOKIE_NAME] !== "1") {
    // Not logged in
    return res.redirect("/");
  }

  res.sendFile(path.join(__dirname, "site", "index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
