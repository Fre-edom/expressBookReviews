const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

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
    }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));