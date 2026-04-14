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

module.exports = {
    criar,
    listar
};