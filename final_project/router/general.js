const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axis = require('axios');



public_users.post("/register", (req,res) => {
  let data = req.body;
  if (data.username && data.password)
    res.status(200).json({message:"user registered successfuly"});
  else
    res.status(500).json({message:"missing username or password"});
});

const getBooks = () =>{
  return new Promise((resolve,reject)=>{
    resolve(books);
  });
}

// Get the book list available in the shop
public_users.get('/',function (req, res) {

  getBooks()
  .then((books) => res.json(books))
  .catch(err => res.status(500).json({message:"something went wrong"}));
  
});

const getBookByIsbn = (isbn) =>{
  return new Promise((resolve,reject)=>{
    resolve(books[isbn]);
  });
}

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  
   let isbn = req.params.isbn;
  getBookByIsbn(isbn)
  .then((book) => res.json(book))
  .catch((err) => res.status(500).json({message:"something went wrong"}) )
 });
 
 const getBooksByAuthor = (author) => {
   return new Promise((resolve, reject) => {
     const result = Object.values(books).filter(book => book.author === author);
     resolve(result);
   });
 };

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let authorParam = req.params.author;

  getBooksByAuthor(authorParam)
  .then((books) => res.json(books))
  .catch((err) => res.status(500).json({message:"something went wrong"}));
});

const getBooksByTitle = (title) => {
  return new Promise((resolve, reject) => {
    const result = Object.values(books).filter(book => book.title === title);
    resolve(result);
  });
};

// Get all books based on title
public_users.get('/title/:title',function (req, res) {

  let titleParam = req.params.title;

  getBooksByTitle(titleParam)
  .then((books) => res.json(books))
  .catch((err) => res.status(500).json({message:"something went wrong"}));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbnParam = req.params.isbn
  Object.keys(books).forEach(key=>{
    if(key == isbnParam)
      res.status(200).json(books[key].reviews);
  });

  res.status(404).json({message:"isbn not found"});
});

module.exports.general = public_users;