"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _jsonwebtoken = _interopRequireWildcard(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pool = require("../models/pool");

var _app = require("../app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_dotenv["default"].config();

var authenticateToken = function authenticateToken(req, res, next) {
  var authHeader = req.headers["authorization"];
  var token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401);

  _jsonwebtoken["default"].verify(token, process.env.TOKEN_SECRET, function (err, user) {
    if (err) return res.status(403);
    req.user = user;
    console.log(user + ": Authorized");
    next(); //return response.status(200).json('User: '+ req.user + "Is verified")
  });
};

var getToken = function getToken(username) {
  return _jsonwebtoken["default"].sign(username, process.env.TOKEN_SECRET);
};

var login = function login(request, response) {
  //Authenticate User
  var email = request.body["email"];
  var password = request.body["password"]; //Encyrpt Password

  var saltRounds = 10;

  _bcrypt["default"].hash(password, saltRounds, function (err, hash) {
    var cryptPassword = hash;

    _pool.pool.query("SELECT ROW_TO_JSON(users) from users where email =$1", [email], function (error, results) {
      if (error) {
        return response.status(403);
      } //If login doesnt exist, create it, then go straight to generating authtoken


      if (results.rows == 0) {
        _pool.pool.query("INSERT INTO users(email, password)\n       VALUES ($1, $2)", [email, cryptPassword], function (error, results) {
          if (error) {
            return response.status(403);
          }

          var authToken = getToken(email);
          response.status(200).json(authToken);
        });
      } else {
        _bcrypt["default"].compare(password, results.rows[0].row_to_json.password, function (err, res) {
          if (err) {
            throw err;
          }

          if (res) {
            console.log(res);

            if (results.rows[0].row_to_json.email === email) {
              var authToken = getToken(email);
              response.status(200).json(authToken);
            } else {
              console.log("wrong email");
              response.status(200).json({
                Message: "Login Failed",
                email: email
              });
            }
          }
        });
      }
    });
  });
};

var createStory = function createStory(request, response) {
  var story = request.body["story"];
  var title = request.body["title"];
  var img = request.body["img"];
  var user = request.user;

  _pool.pool.query("INSERT INTO stories(email, story, title ,picture) VALUES ($1, $2, $3, $4)", [user, story, title, img], function (error, results) {
    if (error) {
      return response.status(403);
    }

    response.status(200).send("Story adde");
  });
};

var updateStory = function updateStory(request, response) {
  var id = parseInt(request.params.id);
  var user = request.user;
  var story = request.body["story"];
  var title = request.body["title"];
  var img = request.body["img"];
  console.log("ID: " + id + "Story" + story + "title" + title + "img" + img);

  _pool.pool.query("UPDATE stories SET story = $1 ,title = $2, picture = $3 WHERE email=$4 AND id = $5", [story, title, img, user, id], function (error, results) {
    if (error) {
      console.log(error);
      return response.status(403);
    }

    response.status(200).send("Story modified with ID: ".concat(id));
  });
};

var deleteStory = function deleteStory(request, response) {
  var id = parseInt(request.params.id);
  var user = request.user;

  _pool.pool.query("DELETE FROM stories WHERE id = $1 AND email=$2", [id, user], function (error, results) {
    if (error) {
      return response.status(403);
    }

    response.status(200).send("Deleted story with the id ".concat(id));
  });
};

var getStories = function getStories(request, response) {
  _pool.pool.query("SELECT ROW_TO_JSON(stories) from stories where email =$1 ORDER BY id", [request.user], function (error, results) {
    if (error) {
      return response.status(403);
    }

    return response.status(200).json(results.rows);
  });
};

var getAllStories = function getAllStories(request, response) {
  _pool.pool.query("SELECT ROW_TO_JSON(stories) from stories", function (error, results) {
    if (error) {
      return response.status(403);
    }

    return response.status(200).json(results.rows);
  });
};

var getStoryById = function getStoryById(request, response) {
  var id = parseInt(request.params.id);

  _pool.pool.query("SELECT * FROM public.stories WHERE id = $1", [id], function (error, results) {
    if (error) {
      return response.status(403);
    }

    return response.status(200).json(results.rows);
  });
};

module.exports = {
  login: login,
  createStory: createStory,
  updateStory: updateStory,
  getStories: getStories,
  getAllStories: getAllStories,
  getStoryById: getStoryById,
  deleteStory: deleteStory,
  authenticateToken: authenticateToken
};