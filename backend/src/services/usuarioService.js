const bcrypt = require('bcrypt');
const db = require('../database/db');

async function criarUsuario({ nome, email, senha, cargo }) {
    const usuarioExistente = await db.query(
        'SELECT id FROM usuario WHERE email = $1',
        [email]
    );

    if (usuarioExistente.rows.length > 0) {
        throw new Error('Email já cadastrado');
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const result = await db.query(
        `INSERT INTO usuario (nome, email, senha, cargo)
         VALUES ($1, $2, $3, $4)
         RETURNING id, nome, email, cargo, created_at`,
        [nome, email, senhaHash, cargo || 'usuario']
    );

    return result.rows[0];
}

async function buscarPorEmail(email) {
    const result = await db.query(
        'SELECT * FROM usuario WHERE email = $1',
        [email]
    );

    return result.rows[0];
}

module.exports = {
    criarUsuario,
    buscarPorEmail
};