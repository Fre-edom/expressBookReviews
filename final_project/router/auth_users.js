const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const username = "maria";
const password = "5yo-tisa";

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  let data  = req.body;
  let token = jwt.sign({ username: data.username,password:data.password }, 'gfgfh');
  if (data.username == username && data.password == password)
    res.status(200).json({message:"loged in successfuly",token:token});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let review = req.query.review;
  return res.status(200).json({message: "review added"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let review = req.query.review;
  return res.status(200).json({message: "review deleted"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;