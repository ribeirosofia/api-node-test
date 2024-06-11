const express = require('express');
const UsersController = require('../controllers/UsersController');
const usersRoutes = express.Router(); 


const usersController = new UsersController();
usersRoutes.post("/", usersController.create.bind(usersController));

module.exports = usersRoutes;