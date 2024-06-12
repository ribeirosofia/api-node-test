const express = require('express');
const UsersController = require('../controllers/UsersController');
const usersRoutes = express.Router(); 

function myMiddleware(request, response, next){
    if(!request.body.isAdmin){
        return response.json({message: "user not authenticated"})
    }

    next();
}

const usersController = new UsersController();
usersRoutes.use(myMiddleware);
usersRoutes.post("/", myMiddleware, usersController.create.bind(usersController));

module.exports = usersRoutes;