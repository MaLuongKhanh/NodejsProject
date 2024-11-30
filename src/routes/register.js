const express = require('express');
const router = express.Router();
const authMiddleware = require('../app/middlewares/AuthMiddleware');

router.get('/', authMiddleware.register);

router.post(
    '/',
    authMiddleware.validateRegister,
    authMiddleware.handleRegister,
);

module.exports = router;
