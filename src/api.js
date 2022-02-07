const bodyParser = require('body-parser');
const express = require('express');
const { getPaginacaoController } = require('./paginacao.controller');
const app = express();
const port = 3000

app.use(bodyParser.json());

app.get('/paginacao', getPaginacaoController);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
