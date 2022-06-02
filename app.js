const express = require('express');
const productsRouters = require('./routers/productsRouters');
const salesRouters = require('./routers/salesRouters');
const errorHandle = require('./middlewares/errorHandle');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouters);
app.use('/sales', salesRouters);

app.use(errorHandle);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
