const db = require('../database/db');

async function criarCategoria({ nome, descricao }) {
    const result = await db.query(
        `INSERT INTO categoria (nome, descricao)
         VALUES ($1, $2)
         RETURNING *`,
        [nome, descricao]
    );

    return result.rows[0];
}

async function listarCategorias() {
    const result = await db.query(
        `SELECT * FROM categoria ORDER BY id DESC`
    );

    return result.rows;
}

async function atualizarCategoria(id, { nome, descricao }) {
    const result = await db.query(
        `UPDATE categoria
         SET nome = $1,
             descricao = $2
         WHERE id = $3
         RETURNING *`,
        [nome, descricao, id]
    );

    return result.rows[0];
}

async function deletarCategoria(id) {
    const client = await db.connect();

    try {
        await client.query("BEGIN");

        const produtos = await client.query(
            `SELECT 1 FROM produto WHERE categoria_id = $1 LIMIT 1`,
            [id]
        );

        if (produtos.rowCount > 0) {
            throw new Error("Não é possível excluir: existem produtos vinculados a esta categoria");
        }

        await client.query(
            `DELETE FROM categoria WHERE id = $1`,
            [id]
        );

        await client.query("COMMIT");

    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}

module.exports = {
    criarCategoria,
    listarCategorias,
    atualizarCategoria,
    deletarCategoria
};