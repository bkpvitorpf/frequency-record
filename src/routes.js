const Express = require('express');
const RegisterController = require('./controllers/RegisterController');

const route = Express.Router();

route.get('/register/:id/:modeId/:courseId/:schoolClass/:matterIdentifier/:classQuanty', RegisterController.save);

module.exports = route;