const express = require('express');
const router = express.Router();
const authMiddleware = require('../app/middlewares/AuthMiddleware');
router.post('/', authMiddleware.handleLogout);

module.exports = router;
