const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioService = require('./usuarioService');

async function login({ email, senha }) {
    const usuario = await usuarioService.buscarPorEmail(email);

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }
    
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
        throw new Error('Senha inválida');
    }

    const token = jwt.sign(
        {
            id: usuario.id,
            email: usuario.email,
            cargo: usuario.cargo
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '1d'
        }
    );

    return {
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            cargo: usuario.cargo
        },
        token
    };

    
}

async function register({ nome, email, senha }) {
    const existe = await usuarioService.buscarPorEmail(email);

    if (existe) {
        throw new Error('Usuário já existe');
    }

    const usuario = await usuarioService.criarUsuario({
        nome,
        email,
        senha
    });

    const token = jwt.sign(
        {
            id: usuario.id,
            email: usuario.email,
            cargo: usuario.cargo
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '1d'
        }
    );

    return {
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            cargo: usuario.cargo
        },
        token
    };
}



module.exports = {
    login,
    register
};