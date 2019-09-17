const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const userRoutes = require("./domain/user/routes");
const todoRoutes = require("./routes/todoRoutes");
const helloRoutes = require("./domain/hello/routes");

const application = express(); 

application.use(bodyParser.json());

application.use("/user", userRoutes);
application.use("/todo", todoRoutes);

app.use((res, req, next) => { 
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

module.exports = application;