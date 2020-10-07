const Express = require('express');

const route = Express.Router();

route.get('/register/:mode/:course/:schoolClass/:matter/:classQuanty/:id', RegisterController.save);

module.exports = route;