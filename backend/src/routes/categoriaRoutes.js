const express = require('express');
const router = express.Router();

const categoriaController = require('../controllers/categoriaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, categoriaController.criar);
router.get('/', authMiddleware, categoriaController.listar);
router.put('/:id', authMiddleware, categoriaController.atualizar);
router.delete('/:id', authMiddleware, categoriaController.deletar);

module.exports = router;