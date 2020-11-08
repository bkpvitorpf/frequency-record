const Express = require('express');
const Cors = require('cors');
const Routes = require('./routes');

// Importa a conexão com a base de dados
require('./database');

const server = Express();

// Permite que a API recebe requisições de quaisquer endereços IP
server.use(Cors());
// Informa que o servidor vai trabalhar com o formato JSON
server.use(Express.json());
// Informa as rotas da API
server.use(Routes);

// process.env.PORT -> Variável ambiente de porta que é usada no heroku
server.listen(process.env.PORT || 3333);
