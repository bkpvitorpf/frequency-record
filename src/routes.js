const Express = require('express');
const AuthMiddleware = require('./middlewares/authMiddleware');
const LoginController = require('./controllers/LoginController');
const FrequencyController = require('./controllers/FrequencyController');
const DataController = require('./controllers/DataController');

const route = Express.Router();

route.get('/register/:id/:mode_id/:course_id/:class_id/:matterIdentifier/:classQuanty', FrequencyController.save);
route.post('/login',LoginController.login);
route.get('/data/matters',AuthMiddleware,DataController.indexMatters);

module.exports = route;