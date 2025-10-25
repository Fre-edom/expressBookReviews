const express = require('express');
const jwt = require('jsonwebtoken');
<<<<<<< HEAD
const session = require('express-session');
=======
>>>>>>> 8a5a2743c2aa112aeab6024c96258417339977e1
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const { SECRET_KEY } = require('./router/auth_users.js');

const app = express();
app.use(express.json());

// JWT authentication middleware
app.use("/customer/auth/*", (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send('Access Denied: No Token Provided!');

<<<<<<< HEAD
app.use("/customer/auth/*", function auth(req,res,next){
    let token = req.headers.authorization.split(' ')[1];
    try{

        let decoded = jwt.verify(token,'gfgfh');

        if (decoded.username == 'maria')
            next();
        else
            res.status(400).json({message:'not authenticated'});
    }
    catch{

        res.status(400).json({message:'not authenticated'});
=======
    const token = authHeader.replace('Bearer ', '');
    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).send('Invalid Token');
>>>>>>> 8a5a2743c2aa112aeab6024c96258417339977e1
    }
});

const PORT = 5000;

// Routes
app.use("/customer", customer_routes);
app.use("/", genl_routes);

<<<<<<< HEAD
app.listen(PORT,()=>console.log("Server is running"));
=======
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
>>>>>>> 8a5a2743c2aa112aeab6024c96258417339977e1
