const express = require('express');
const router = express.Router();
const authMiddleware = require('../app/middlewares/AuthMiddleWare');

router.get('/', authMiddleware.forgotPassword);
router.post('/', authMiddleware.handleForgotPassword);
router.get('/reset-password/:token', authMiddleware.resetPassword);
router.post('/reset-password/:token', authMiddleware.handleResetPassword);

module.exports = router;
