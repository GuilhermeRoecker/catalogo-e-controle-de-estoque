const movimentacaoService = require("../services/movimentacaoService");

async function criar(req, res) {
  try {
    const { produto_id, tipo, quantidade, observacao } = req.body;

    const usuario_id = req.user?.id;

    if (!produto_id) {
      return res.status(400).json({
        erro: "Selecione um produto",
      });
    }

    if (!tipo) {
      return res.status(400).json({
        erro: "Selecione o tipo de movimentação (entrada ou saída)",
      });
    }

    if (tipo !== "entrada" && tipo !== "saida") {
      return res.status(400).json({
        erro: "Tipo de movimentação inválido",
      });
    }

    if (!quantidade || quantidade <= 0) {
      return res.status(400).json({
        erro: "Informe uma quantidade válida",
      });
    }

    if (!observacao || observacao.trim() === "") {
      return res.status(400).json({
        erro: "Observação é obrigatória",
      });
    }

    const movimentacao = await movimentacaoService.criarMovimentacao({
      produto_id,
      usuario_id,
      tipo,
      quantidade,
      observacao,
    });

    return res.status(201).json(movimentacao);
  } catch (err) {
    console.error(err);

    const mensagensConhecidas = [
      "Produto não encontrado",
      "Estoque insuficiente",
    ];

    if (mensagensConhecidas.includes(err.message)) {
      return res.status(400).json({
        erro: err.message,
      });
    }

    return res.status(500).json({
      erro: "Erro ao criar movimentação",
    });
  }
}

async function listar(req, res) {
  try {
    const movs = await movimentacaoService.listarMovimentacoes();
    return res.json(movs);
  } catch (err) {
    return res.status(500).json({ erro: "Erro ao listar movimentações" });
  }
}

async function buscarPorId(req, res) {
  try {
    const mov = await movimentacaoService.buscarPorId(req.params.id);

    if (!mov) {
      return res.status(404).json({ erro: "Movimentação não encontrada" });
    }

    return res.json(mov);
  } catch (err) {
    return res.status(500).json({ erro: "Erro ao buscar movimentação" });
  }
}

async function filtrar(req, res) {
  const { dataInicio, dataFim } = req.query;

  const result = await db.query(
    `
        SELECT * FROM movimentacao
        WHERE data BETWEEN $1 AND $2
        ORDER BY data DESC
    `,
    [dataInicio, dataFim],
  );

  res.json(result.rows);
}

module.exports = {
  criar,
  listar,
  buscarPorId,
  filtrar,
};
