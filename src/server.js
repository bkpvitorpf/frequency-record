const Express = require('express');
const Cors = require('cors');
const Routes = require('./routes');

require('./database');

const server = Express();

server.use(Cors());
server.use(Express.json());
server.use(Routes);

server.listen(process.env.PORT || 3333);
