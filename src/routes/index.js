const express = require('express');
const usersRoutes = require('./users.routes'); 
const notesRoutes = require('./notes.routes'); 
const tagsRoutes = require('./tags.routes');
const routes = express.Router();

routes.use("/users", usersRoutes);
routes.use("/notes", notesRoutes);
routes.use("/tags", tagsRoutes);

module.exports = routes;