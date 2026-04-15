const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ erro: 'Token ausente' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log('ERRO JWT:', err.message);
        return res.status(401).json({ erro: err.message });
    }
}

module.exports = authMiddleware;