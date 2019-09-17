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

module.exports = application;