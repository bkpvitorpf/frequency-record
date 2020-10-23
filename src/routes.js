const Express = require('express');
const LoginController = require('./controllers/LoginController');
const FrequencyController = require('./controllers/FrequencyController');

const route = Express.Router();

route.get('/register/:id/:mode_id/:course_id/:class_id/:matterIdentifier/:classQuanty', FrequencyController.save);
route.post('/login',LoginController.login);

module.exports = route;