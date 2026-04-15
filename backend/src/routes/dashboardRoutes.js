const express = require('express');
const router = express.Router();

const controller = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/baixo', authMiddleware, controller.estoqueBaixo);
router.get('/categorias', authMiddleware, controller.categorias);
router.get('/recentes', authMiddleware, controller.recentes);

module.exports = router;