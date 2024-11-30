const express = require('express');
const router = express.Router();
const attendanceMiddleWare = require('../app/middlewares/AttendanceMiddleWare');

router.get('/', attendanceMiddleWare.index);
router.post('/create', attendanceMiddleWare.create);
router.get('/findByDateAndShift', attendanceMiddleWare.findByDateAndShift);

module.exports = router;
