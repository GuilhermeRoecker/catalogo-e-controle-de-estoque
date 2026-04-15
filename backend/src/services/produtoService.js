const db = require('../database/db');

async function criarProduto({
    nome,
    descricao,
    preco,
    quantidade,
    categoria_id,
    criado_por
}) {
    const result = await db.query(
        `INSERT INTO produto
         (nome, descricao, preco, quantidade, categoria_id, criado_por)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [nome, descricao, preco, quantidade, categoria_id, criado_por]
    );

    return result.rows[0];
}

async function listarProdutos() {
    const result = await db.query(
        `SELECT * FROM produto ORDER BY id DESC`
    );

    return result.rows;
}

async function buscarProdutoPorId(id) {
    const result = await db.query(
        `SELECT * FROM produto WHERE id = $1`,
        [id]
    );

    return result.rows[0];
}

async function deletarProduto(id) {
    await db.query(
        `DELETE FROM produto WHERE id = $1`,
        [id]
    );
}

async function atualizarProduto(id, {
    nome,
    descricao,
    preco,
    categoria_id
}) {
    const result = await db.query(
        `UPDATE produto
        SET nome = $1,
            descricao = $2,
            preco = $3,
            categoria_id = $4
        WHERE id = $5
         RETURNING *`,
        [nome, descricao, preco, categoria_id, id]
    );

    return result.rows[0];
}

module.exports = {
    criarProduto,
    listarProdutos,
    buscarProdutoPorId,
    deletarProduto,
    atualizarProduto
};