const Express = require('express');

const route = Express.Router();

route.get('/',(req,res) => {
    res.send("Ok");
})

module.exports = route;