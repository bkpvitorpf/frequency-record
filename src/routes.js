const Express = require('express');
const RegisterController = require('./controllers/RegisterController');

const route = Express.Router();

route.get('/register/:id/:mode/:course/:schoolClass/:matter/:classQuanty', RegisterController.save);

module.exports = route;