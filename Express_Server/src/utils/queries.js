import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { pool } from "../models/pool";
import { response } from "../app";
dotenv.config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401);
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    req.user = user;
    console.log(user + ": Authorized");
    next();
    //return response.status(200).json('User: '+ req.user + "Is verified")
  });
};

const getToken = (username) => {
  return jwt.sign(username, process.env.TOKEN_SECRET);
};

const login = (request, response) => {
  //Authenticate User
  const email = request.body["email"];
  const password = request.body["password"];

  //Encyrpt Password
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    const cryptPassword = hash;

    pool.query(
      "SELECT ROW_TO_JSON(users) from users where email =$1",
      [email],
      (error, results) => {
        if (error) {
          return response.status(403);
        }

        //If login doesnt exist, create it, then go straight to generating authtoken
        if (results.rows == 0) {
          pool.query(
            `INSERT INTO users(email, password)
       VALUES ($1, $2)`,
            [email, cryptPassword],
            (error, results) => {
              if (error) {
                return response.status(403);
              }
              const authToken = getToken(email);
              response.status(200).json(authToken);
            }
          );
        } else {
          bcrypt.compare(
            password,
            results.rows[0].row_to_json.password,
            function (err, res) {
              if (err) {
                throw err;
              }
              if (res) {
                console.log(res);
                if (results.rows[0].row_to_json.email === email) {
                  const authToken = getToken(email);
                  response.status(200).json(authToken);
                } else {
                  console.log("wrong email");
                  response.status(200).json({
                    Message: "Login Failed",
                    email: email,
                  });
                }
              }
            }
          );
        }
      }
    );
  });
};

const createStory = (request, response) => {
  const story = request.body["story"];
  const title = request.body["title"];
  const img = request.body["img"];
  const user = request.user;

  pool.query(
    `INSERT INTO stories(email, story, title ,picture) VALUES ($1, $2, $3, $4)`,
    [user, story, title, img],
    (error, results) => {
      if (error) {
        return response.status(403);
      }
      response.status(200).send(`Story adde`);
    }
  );
};

const updateStory = (request, response) => {
  const id = parseInt(request.params.id);
  const user = request.user;
  const story = request.body["story"];
  const title = request.body["title"];
  const img = request.body["img"];

  console.log("ID: " + id + "Story" + story + "title" + title + "img" + img);

  pool.query(
    `UPDATE stories SET story = $1 ,title = $2, picture = $3 WHERE email=$4 AND id = $5`,
    [story, title, img, user, id],
    (error, results) => {
      if (error) {
        console.log(error);
        return response.status(403);
      }
      response.status(200).send(`Story modified with ID: ${id}`);
    }
  );
};

const deleteStory = (request, response) => {
  const id = parseInt(request.params.id);
  const user = request.user;

  pool.query(
    `DELETE FROM stories WHERE id = $1 AND email=$2`,
    [id, user],
    (error, results) => {
      if (error) {
        return response.status(403);
      }
      response.status(200).send(`Deleted story with the id ${id}`);
    }
  );
};

const getStories = (request, response) => {
  pool.query(
    "SELECT ROW_TO_JSON(stories) from stories where email =$1 ORDER BY id",
    [request.user],
    (error, results) => {
      if (error) {
        return response.status(403);
      }
      return response.status(200).json(results.rows);
    }
  );
};

const getAllStories = (request, response) => {
  pool.query("SELECT ROW_TO_JSON(stories) from stories", (error, results) => {
    if (error) {
      return response.status(403);
    }
    return response.status(200).json(results.rows);
  });
};

const getStoryById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    "SELECT * FROM public.stories WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        return response.status(403);
      }
      return response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  login,
  createStory,
  updateStory,
  getStories,
  getAllStories,
  getStoryById,
  deleteStory,
  authenticateToken,
};
