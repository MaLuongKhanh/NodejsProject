const express = require('express');
const router = express.Router();
const profileMiddleware = require('../app/middlewares/ProfileMiddleWare');

router.get('/', profileMiddleware.index);

router.get('/data', profileMiddleware.profileData);

router.put('/update', profileMiddleware.updateProfile);

router.post('/avatar', profileMiddleware.updateAvatar);

module.exports = router;
