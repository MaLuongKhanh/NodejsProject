const express = require('express');
const router = express.Router();
const authMiddleware = require('../app/middlewares/AuthMiddleWare');

router.get('/', authMiddleware.register);

router.post(
    '/',
    authMiddleware.validateRegister,
    authMiddleware.handleRegister,
);

module.exports = router;
