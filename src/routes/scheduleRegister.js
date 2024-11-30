const express = require('express');
const router = express.Router();
const scheduleMiddleware = require('../app/middlewares/ScheduleMiddleware');

router.get('/', scheduleMiddleware.index);
router.post('/register', scheduleMiddleware.registerShift);
router.get('/schedule', scheduleMiddleware.getSchedule);
router.delete('/cancel/:ngaytrongtuan/:catruc', scheduleMiddleware.cancelShift);

module.exports = router;
