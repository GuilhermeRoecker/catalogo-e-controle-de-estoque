const dashboardService = require('../services/dashboardService');

async function estoqueBaixo(req, res) {
    try {
        const data = await dashboardService.estoqueBaixo();
        return res.json(data);
    } catch {
        return res.status(500).json({ erro: "Erro ao buscar estoque baixo" });
    }
}

async function categorias(req, res) {
    try {
        const data = await dashboardService.categoriasResumo();
        return res.json(data);
    } catch {
        return res.status(500).json({ erro: "Erro ao buscar categorias" });
    }
}

async function recentes(req, res) {
    try {
        const data = await dashboardService.movimentacoesRecentes();
        return res.json(data);
    } catch {
        return res.status(500).json({ erro: "Erro ao buscar movimentações" });
    }
}

module.exports = {
    estoqueBaixo,
    categorias,
    recentes
};