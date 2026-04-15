const db = require('../database/db');

async function estoqueBaixo() {
    const result = await db.query(`
        SELECT * FROM produto
        WHERE quantidade < 5
        ORDER BY quantidade ASC
    `);
    return result.rows;
}

async function produtosPorCategoria() {
    const result = await db.query(`
        SELECT c.nome, COUNT(p.id) as total
        FROM categoria c
        LEFT JOIN produto p ON p.categoria_id = c.id
        GROUP BY c.nome
    `);
    return result.rows;
}

async function movimentacoesRecentes() {
    const result = await db.query(`
        SELECT m.*, p.nome as produto_nome
        FROM movimentacao m
        JOIN produto p ON p.id = m.produto_id
        ORDER BY m.data DESC
        LIMIT 5
    `);
    return result.rows;
}

module.exports = {
    estoqueBaixo,
    produtosPorCategoria,
    movimentacoesRecentes
};