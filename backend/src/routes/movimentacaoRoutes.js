const express = require('express');
const router = express.Router();

const movimentacaoController = require('../controllers/movimentacaoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, movimentacaoController.criar);
router.get('/', authMiddleware, movimentacaoController.listar);
router.get('/:id', authMiddleware, movimentacaoController.buscarPorId);

module.exports = router;