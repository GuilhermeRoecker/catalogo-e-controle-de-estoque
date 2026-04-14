const express = require('express');
const router = express.Router();

const categoriaController = require('../controllers/categoriaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, categoriaController.criar);
router.get('/', authMiddleware, categoriaController.listar);

module.exports = router;