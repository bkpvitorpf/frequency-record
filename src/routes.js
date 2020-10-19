const Express = require('express');
const RegisterController = require('./controllers/RegisterController');

const route = Express.Router();

route.get('/register/:id/:mode_id/:course_id/:class_id/:matterIdentifier/:classQuanty', RegisterController.save);

module.exports = route;