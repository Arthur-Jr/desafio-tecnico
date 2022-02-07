const { getPaginacaoService } = require("./paginacao.service");

const getPaginacaoController = (req, res) => {
  const { page, totalPage } = req.query;

  const paginacao = getPaginacaoService(page, totalPage);

  res.status(200).json({ paginacao });
};

module.exports = {
  getPaginacaoController,
}
