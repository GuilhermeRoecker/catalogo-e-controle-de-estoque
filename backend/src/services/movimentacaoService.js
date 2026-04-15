const db = require('../database/db');

async function criarMovimentacao({
    produto_id,
    usuario_id,
    tipo,
    quantidade,
    observacao
}) {
    const client = await db.connect();

    try {
        await client.query("BEGIN");

        const produtoRes = await client.query(
            `SELECT * FROM produto WHERE id = $1 FOR UPDATE`,
            [produto_id]
        );

        const produto = produtoRes.rows[0];

        if (!produto) {
            throw new Error("Produto não encontrado");
        }

        let novaQuantidade = produto.quantidade;

        if (tipo === "saida") {
            if (quantidade > produto.quantidade) {
                throw new Error("Estoque insuficiente");
            }

            novaQuantidade -= quantidade;
        }

        if (tipo === "entrada") {
            novaQuantidade += quantidade;
        }

        await client.query(
            `UPDATE produto SET quantidade = $1 WHERE id = $2`,
            [novaQuantidade, produto_id]
        );

        const result = await client.query(
            `INSERT INTO movimentacao
            (produto_id, usuario_id, tipo, quantidade, observacao, data)
            VALUES ($1, $2, $3, $4, $5, NOW())
            RETURNING *`,
            [produto_id, usuario_id, tipo, quantidade, observacao]
        );

        await client.query("COMMIT");

        return result.rows[0];
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}

async function listarMovimentacoes() {
    const result = await db.query(`
        SELECT m.*, p.nome AS produto_nome
        FROM movimentacao m
        JOIN produto p ON p.id = m.produto_id
        ORDER BY m.id DESC
    `);

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