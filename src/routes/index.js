const express = require('express');
const usersRoutes = require('./users.routes'); 
const routes = express.Router();

routes.use("/users", usersRoutes);

module.exports = routes;