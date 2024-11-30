const express = require('express');
const router = express.Router();
const authMiddleware = require('../app/middlewares/AuthMiddleWare');

router.get('/', authMiddleware.login);

router.post('/', authMiddleware.validateLogin, authMiddleware.handleLogin);

module.exports = router;
