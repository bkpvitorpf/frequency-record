const Express = require('express');
const RegisterController = require('./controllers/RegisterController');

const route = Express.Router();

route.get('/register/:id/:modeId/:courseId/:classId/:matterIdentifier/:classQuanty', RegisterController.save);

module.exports = route;