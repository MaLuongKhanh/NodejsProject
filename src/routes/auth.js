const express = require('express');
const router = express.Router();
const authMiddleWare = require('../app/middlewares/AuthMiddleWare');

router.get('/check', authMiddleWare.verifyToken, authMiddleWare.checkAuth);
router.post('/refresh-token', authMiddleWare.refreshToken);
module.exports = router;
