var express = require("express");
var cors = require("cors");
var app = express();
const db = require("./utils/queries");

app.use(express.json());

app.use(cors());

app.options("*", cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Ec2 Landing
app.get("/", (req, res) => res.send("You have landed"));

app.post("/login/", db.login);
app.get("/home", db.getAllStories),
  app.get("/stories/", db.authenticateToken, db.getStories),
  app.get("/stories/:id", db.authenticateToken, db.getStoryById),
  app.post("/stories/", db.authenticateToken, db.createStory),
  app.put("/stories/:id", db.authenticateToken, db.updateStory),
  app.delete("/stories/:id", db.authenticateToken, db.deleteStory);

module.exports = app;
