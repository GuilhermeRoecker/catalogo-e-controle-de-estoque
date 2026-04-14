const produtoService = require('../services/produtoService');

async function criar(req, res) {
    try {
        const {
            nome,
            descricao,
            preco,
            quantidade,
            categoria_id
        } = req.body;

        if (!nome || !preco || !quantidade || !categoria_id) {
            return res.status(400).json({
                erro: 'Campos obrigatórios faltando'
            });
        }

        const criado_por = req.user?.id; // assumindo authMiddleware injeta user

        const produto = await produtoService.criarProduto({
            nome,
            descricao,
            preco,
            quantidade,
            categoria_id,
            criado_por
        });

        return res.status(201).json(produto);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: 'Erro ao criar produto' });
    }
}

async function listar(req, res) {
    try {
        const produtos = await produtoService.listarProdutos();
        return res.json(produtos);
    } catch (err) {
        return res.status(500).json({ erro: 'Erro ao listar produtos' });
    }
}

async function buscarPorId(req, res) {
    try {
        const produto = await produtoService.buscarProdutoPorId(req.params.id);

        if (!produto) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }

        return res.json(produto);
    } catch (err) {
        return res.status(500).json({ erro: 'Erro ao buscar produto' });
    }
}

async function deletar(req, res) {
    try {
        await produtoService.deletarProduto(req.params.id);
        return res.status(204).send();
    } catch (err) {
        return res.status(500).json({ erro: 'Erro ao deletar produto' });
    }
}

module.exports = {
    criar,
    listar,
    buscarPorId,
    deletar
};