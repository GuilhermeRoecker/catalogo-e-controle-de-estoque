const categoriaService = require('../services/categoriaService');

async function criar(req, res) {
    try {
        const { nome, descricao } = req.body;

        if (!nome) {
            return res.status(400).json({ erro: 'Nome é obrigatório' });
        }

        const categoria = await categoriaService.criarCategoria({ nome, descricao });

        res.status(201).json(categoria);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao criar categoria' });
    }
}

async function listar(req, res) {
    try {
        const categorias = await categoriaService.listarCategorias();
        res.json(categorias);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao listar categorias' });
    }
}

async function atualizar(req, res) {
    try {
        const { id } = req.params;
        const { nome, descricao } = req.body;

        if (!nome) {
            return res.status(400).json({ erro: 'Nome é obrigatório' });
        }

        const categoria = await categoriaService.atualizarCategoria(id, {
            nome,
            descricao
        });

        return res.json(categoria);
    } catch (err) {
        return res.status(500).json({ erro: 'Erro ao atualizar categoria' });
    }
}

async function deletar(req, res) {
    try {
        await categoriaService.deletarCategoria(req.params.id);
        return res.json({ mensagem: "Categoria deletada" });

    } catch (err) {
        return res.status(400).json({
            erro: err.message
        });
    }
}

module.exports = {
    criar,
    listar,
    atualizar,
    deletar
};