const express = require('express');
const bodyParser = require('body-parser')

const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const helloRoutes = require("./routes/helloRoutes");

const application = express(); 

application.use(bodyParser.json())

application.use("/hello", helloRoutes);
application.use("/user", userRoutes);
application.use("/todo", todoRoutes);

module.exports = application;