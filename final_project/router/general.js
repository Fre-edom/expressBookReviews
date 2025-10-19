// Get the book list available in the shop
public_users.get('/', (req, res) => {
    res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
});

// Get books by author
public_users.get('/author/:author', (req, res) => {
    const author = req.params.author;
    const booksByAuthor = Object.values(books).filter(b => b.author === author);
    if (booksByAuthor.length === 0) return res.status(404).json({ message: "No books found for this author" });
    res.status(200).json(booksByAuthor);
});

// Get books by title
public_users.get('/title/:title', (req, res) => {
    const title = req.params.title.toLowerCase();
    const booksByTitle = Object.values(books).filter(b => b.title.toLowerCase().includes(title));
    if (booksByTitle.length === 0) return res.status(404).json({ message: "No books found with this title" });
    res.status(200).json(booksByTitle);
});
