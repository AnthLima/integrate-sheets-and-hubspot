const { Router } = require('express');
const LoginController = require('./app/Controllers/LoginController');
const UserController = require('./app/Controllers/UserController');
const AuthMidleware = require('./app/Midlewares/AuthMidleware');

const routes = new Router();


routes.post('/user', AuthMidleware, UserController.store);
routes.get('/user', AuthMidleware, UserController.show);

routes.post('/login', LoginController.index);

module.exports = routes;
