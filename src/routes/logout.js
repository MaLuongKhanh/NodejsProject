const express = require('express');
const router = express.Router();
const authMiddleware = require('../app/middlewares/AuthMiddleWare');
router.post('/', authMiddleware.handleLogout);

module.exports = router;
