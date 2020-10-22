const Express = require('express');
const LoginController = require('./controllers/LoginController');
const RegisterController = require('./controllers/RegisterController');

const route = Express.Router();

route.get('/register/:id/:mode_id/:course_id/:class_id/:matterIdentifier/:classQuanty', RegisterController.save);
route.post('/login',LoginController.login);

module.exports = route;