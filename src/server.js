const Express = require('express');
const Routes = require('./routes');
const Cors = require('cors');

const app = Express();

app.use(Cors());
app.use(Express.json());
app.use(Routes);

app.listen(process.env.PORT || 3333);
