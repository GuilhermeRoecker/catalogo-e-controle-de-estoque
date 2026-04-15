const produtoService = require('../services/produtoService');

async function criar(req, res) {
    try {
        const {
            nome,
            descricao,
            preco,
            categoria_id
        } = req.body;

        if (!nome || !preco || !categoria_id) {
            return res.status(400).json({
                erro: 'Campos obrigatórios faltando'
            });
        }

        const criado_por = req.user?.id;

        const produto = await produtoService.criarProduto({
            nome,
            descricao,
            preco,
            quantidade: 0,
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

async function atualizar(req, res) {
    try {
        const { id } = req.params;

        const {
            nome,
            descricao,
            preco,
            categoria_id
        } = req.body;

        const produto = await produtoService.atualizarProduto(id, {
            nome,
            descricao,
            preco,
            categoria_id
        });

        return res.json(produto);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: 'Erro ao atualizar produto' });
    }
}

module.exports = {
    criar,
    listar,
    buscarPorId,
    deletar,
    atualizar
};