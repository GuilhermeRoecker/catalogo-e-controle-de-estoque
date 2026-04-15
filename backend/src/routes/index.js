const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const categoriaRoutes = require('./categoriaRoutes');
const produtoRoutes = require('./produtoRoutes');
const movimentacaoRoutes = require('./movimentacaoRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/auth', authRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/produtos', produtoRoutes);
router.use('/movimentacoes', movimentacaoRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;