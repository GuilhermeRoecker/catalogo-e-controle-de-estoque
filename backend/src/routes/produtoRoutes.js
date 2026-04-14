const express = require('express');
const router = express.Router();

const produtoController = require('../controllers/produtoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, produtoController.criar);
router.get('/', authMiddleware, produtoController.listar);
router.get('/:id', authMiddleware, produtoController.buscarPorId);
router.delete('/:id', authMiddleware, produtoController.deletar);

module.exports = router;