const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const port = 3000;

const parser = multer();

const COOKIE_NAME = "is-logged-in";

app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "site", "static")));

app.get("/login", function(req, res) {
  if (req.cookies[COOKIE_NAME] === "1") {
    // Already logged in
    return res.redirect("/");
  }

  res.sendFile(path.join(__dirname, "site", "login.html"));
});

app.post("/login", parser.none(), function(req, res) {
  const accepts = req.accepts(["json", "html"]);
  let success = false;

  if (req.body.username === "username" && req.body.password === "password") {
    success = true;
    res.cookie(COOKIE_NAME, "1");
  }

  if (accepts === "json") {
    if (success) {
      res.status(200);
    } else {
      res.status(401);
    }

    return res.send({ success });
  } else if (accepts === "html") {
    if (success) {
      return res.redirect("/");
    } else {
      return res.status(401).redirect("/login");
    }
  }

  return res.status(406).send("Not Acceptable");
});

app.get("/logout", function(req, res) {
  res.clearCookie(COOKIE_NAME).redirect("/login");
});

app.get("/", function(req, res) {
  if (req.cookies[COOKIE_NAME] !== "1") {
    // Not logged in
    return res.redirect("/login");
  }

  res.sendFile(path.join(__dirname, "site", "dashboard.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
