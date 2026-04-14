const usuarioService = require('../services/usuarioService');

async function registrar(req, res) {
    try {
        const { nome, email, senha, cargo } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                erro: 'Nome, email e senha são obrigatórios'
            });
        }

        const usuario = await usuarioService.criarUsuario({
            nome,
            email,
            senha,
            cargo
        });

        return res.status(201).json(usuario);

    } catch (error) {
        return res.status(400).json({
            erro: error.message
        });
    }
}

module.exports = {
    registrar
};