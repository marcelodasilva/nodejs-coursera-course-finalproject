const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body)
    if ( username && password ) {
        if (!isValid(username)) {
            users.push({"username":username, "password":password});
            return res.status(300).json({message: "User successfully registered. You can login"});
        } else {
            return res.status(404).json({message: "User already exist!"});
        }
    }
    return res.status(404).json({message: "Unable to register the user. Please, try again."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    console.log(books);
    return res.json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;

    return res.json(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;

    for(let i = 1; i<10; i++) {
        if(books[i].author === author)
        return res.json(books[i]);
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;

  for(let i = 1; i<10; i++) {
      if(books[i].title === title)
      return res.json(books[i]);
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn
    return res.json(books[isbn].reviews);
});

function getAllBooks() {
    return new Promise((resolve, reject) => {
    resolve(books);
    });
  
    }
    getAllBooks();
  
    function getByISBN(isbn) {
      return new Promise((resolve, reject) => {
      let isbnNumber = parseInt(isbn);
      if (books[isbnNumber]) {
      resolve(books[isbnNumber]);
      } else {
      reject({ status: 404, message: `ISBN ${isbn} not found` });
      }
      })
      }
      getByISBN(1)
  
      function getByAuthor(author) {
        return new Promise((resolve, reject) => {
        let authorname = author;
        if (books[author]) {
        resolve(books[author]);
        }
        })
        }
       getByAuthor("Chinua Achebe")
  
  
       function getByTitle(title) {
        return new Promise((resolve, reject) => {
  
        if (books[title]) {
        resolve(books[title]);
        }
        })
        }
       getByTitle("Fairy tales")

module.exports.general = public_users;
