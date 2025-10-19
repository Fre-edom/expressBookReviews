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
  