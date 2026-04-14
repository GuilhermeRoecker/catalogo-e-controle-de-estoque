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

module.exports = {
    criarCategoria,
    listarCategorias
};