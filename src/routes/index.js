const express = require('express');
const usersRoutes = require('./users.routes'); 
const notesRoutes = require('./notes.routes'); 
const routes = express.Router();

routes.use("/users", usersRoutes);
routes.use("/notes", notesRoutes);

module.exports = routes;