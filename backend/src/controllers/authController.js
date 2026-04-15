const authService = require('../services/authService');


async function login(req, res) {
    try {
        const { email, senha } = req.body;

        const resultado = await authService.login({ email, senha });

        res.cookie('token', resultado.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24
        });

        return res.json({
            usuario: resultado.usuario
        });

    } catch (error) {
        return res.status(401).json({ erro: error.message });
    }
}

function me(req, res) {
    return res.json(req.user);
}

function logout(req, res) {
    res.clearCookie('token');
    return res.json({ mensagem: 'Logout realizado' });
}

async function register(req, res) {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                erro: 'Campos obrigatórios faltando'
            });
        }

        const resultado = await authService.register({
            nome,
            email,
            senha
        });

        res.cookie('token', resultado.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24
        });

        return res.json({ usuario: resultado.usuario });

    } catch (err) {
        return res.status(400).json({ erro: err.message });
    }
}

module.exports = {
    login,
    me,
    logout,
    register
};