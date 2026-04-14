const movimentacaoService = require('../services/movimentacaoService');

async function criar(req, res) {
    try {
        const {
            produto_id,
            tipo,
            quantidade,
            observacao
        } = req.body;

        const usuario_id = req.user?.id;

        if (!produto_id || !tipo || !quantidade) {
            return res.status(400).json({
                erro: 'produto_id, tipo e quantidade são obrigatórios'
            });
        }

        if (tipo !== 'entrada' && tipo !== 'saida') {
            return res.status(400).json({
                erro: 'tipo deve ser entrada ou saida'
            });
        }

        const movimentacao = await movimentacaoService.criarMovimentacao({
            produto_id,
            usuario_id,
            tipo,
            quantidade,
            observacao
        });

        return res.status(201).json(movimentacao);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: 'Erro ao criar movimentação' });
    }
}

async function listar(req, res) {
    try {
        const movs = await movimentacaoService.listarMovimentacoes();
        return res.json(movs);
    } catch (err) {
        return res.status(500).json({ erro: 'Erro ao listar movimentações' });
    }
}

async function buscarPorId(req, res) {
    try {
        const mov = await movimentacaoService.buscarPorId(req.params.id);

        if (!mov) {
            return res.status(404).json({ erro: 'Movimentação não encontrada' });
        }

        return res.json(mov);
    } catch (err) {
        return res.status(500).json({ erro: 'Erro ao buscar movimentação' });
    }
}

module.exports = {
    criar,
    listar,
    buscarPorId
};