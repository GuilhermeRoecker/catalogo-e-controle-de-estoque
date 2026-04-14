const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const categoriaRoutes = require('./categoriaRoutes');
const produtoRoutes = require('./produtoRoutes');
const movimentacaoRoutes = require('./movimentacaoRoutes');

router.use('/auth', authRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/produtos', produtoRoutes);
router.use('/movimentacoes', movimentacaoRoutes);

module.exports = router;