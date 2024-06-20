const express = require('express');
const TagsController = require('../controllers/TagsController');
const tagsRoutes = express.Router(); 

const tagsController = new TagsController();

tagsRoutes.get("/:user_id", tagsController.index.bind(tagsController));

module.exports = tagsRoutes;