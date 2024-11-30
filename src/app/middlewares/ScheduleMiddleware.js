const { body, validationResult } = require('express-validator');
const scheduleController = require('../controllers/ScheduleController');

class ScheduleMiddleware {
    index = (req, res, next) => {
        scheduleController.index(req, res, next);
    };

    registerShift = [
        body('ngaytrongtuan')
            .isInt({ min: 2, max: 8 })
            .withMessage('Ngày trong tuần không hợp lệ'),

        body('catruc')
            .isInt({ min: 1, max: 4 })
            .withMessage('Ca trực không hợp lệ'),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }
            scheduleController.register(req, res, next);
        },
    ];

    getSchedule = (req, res, next) => {
        scheduleController.getSchedule(req, res, next);
    };

    cancelShift = (req, res, next) => {
        scheduleController.cancelShift(req, res, next);
    };
}

module.exports = new ScheduleMiddleware();
