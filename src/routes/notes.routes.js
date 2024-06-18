const express = require('express');
const NotesController = require('../controllers/NotesController');
const notesRoutes = express.Router(); 

const notesController = new NotesController();

notesRoutes.get("/", notesController.index.bind(notesController));
notesRoutes.post("/:user_id", notesController.create.bind(notesController));
notesRoutes.get("/:id", notesController.show.bind(notesController));
notesRoutes.delete("/:id", notesController.delete.bind(notesController));

module.exports = notesRoutes;