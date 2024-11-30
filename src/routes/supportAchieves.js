const express = require('express');
const router = express.Router();
const supportAchievesMiddleWare = require('../app/middlewares/SupportAchievesMiddleWare');

router.get('/', supportAchievesMiddleWare.index);
router.get('/top-ho-tro', supportAchievesMiddleWare.getTopSupportTechnicians);
router.get(
    '/top-di-truc',
    supportAchievesMiddleWare.getTopAttendanceTechnicians,
);

module.exports = router;
