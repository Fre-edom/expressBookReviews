const express = require('express');
const jwt = require('jsonwebtoken');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const { SECRET_KEY } = require('./router/auth_users.js');

const app = express();
app.use(express.json());

// JWT authentication middleware
app.use("/customer/auth/*", (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send('Access Denied: No Token Provided!');

    const token = authHeader.replace('Bearer ', '');
    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).send('Invalid Token');
    }
});

const PORT = 5000;

// Routes
app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
