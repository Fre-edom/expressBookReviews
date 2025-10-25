<<<<<<< HEAD
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
=======
// Add or update a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) return res.status(401).json({ message: "Missing token" });
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const username = decoded.username;
  
      if (!books[isbn]) return res.status(404).json({ message: "Book not found" });
  
      if (!books[isbn].reviews) books[isbn].reviews = {};
      books[isbn].reviews[username] = review;
  
      return res.status(200).json({ message: "Review added/updated successfully" });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  });
  
  // Delete a book review
  regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const token = req.headers.authorization?.split(" ")[1];
  
    if (!token) return res.status(401).json({ message: "Missing token" });
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const username = decoded.username;
  
      if (!books[isbn]) return res.status(404).json({ message: "Book not found" });
      if (!books[isbn].reviews || !books[isbn].reviews[username]) {
        return res.status(404).json({ message: "No review found for this user" });
      }
  
      delete books[isbn].reviews[username];
      return res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  });
  
>>>>>>> 8a5a2743c2aa112aeab6024c96258417339977e1
