const db = require('../database/db');

async function criarMovimentacao({
    produto_id,
    usuario_id,
    tipo,
    quantidade,
    observacao
}) {
    const result = await db.query(
        `INSERT INTO movimentacao
         (produto_id, usuario_id, tipo, quantidade, observacao, data)
         VALUES ($1, $2, $3, $4, $5, NOW())
         RETURNING *`,
        [produto_id, usuario_id, tipo, quantidade, observacao]
    );

    return result.rows[0];
}

async function listarMovimentacoes() {
    const result = await db.query(
        `SELECT * FROM movimentacao ORDER BY id DESC`
    );

    return result.rows;
}

async function buscarPorId(id) {
    const result = await db.query(
        `SELECT * FROM movimentacao WHERE id = $1`,
        [id]
    );

    return result.rows[0];
}

module.exports = {
    criarMovimentacao,
    listarMovimentacoes,
    buscarPorId
};