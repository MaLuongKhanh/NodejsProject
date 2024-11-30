const attendanceController = require('../controllers/AttendanceController.js');
const { body, validationResult } = require('express-validator');
class attendanceMiddleware {
    index = (req, res, next) => {
        attendanceController.index(req, res, next);
    };
    create = [
        body()
            .isArray()
            .withMessage('Dữ liệu phải là một mảng')
            .notEmpty()
            .withMessage('Danh sách điểm danh không được trống'),

        body('*.mssv')
            .trim()
            .notEmpty()
            .withMessage('MSSV không được để trống')
            .isLength({ min: 8, max: 8 })
            .withMessage('MSSV phải có 8 ký tự'),

        body('*.diemdanh')
            .trim()
            .notEmpty()
            .withMessage('Trạng thái điểm danh không được để trống')
            .isIn(['present', 'late', 'absent'])
            .withMessage('Trạng thái điểm danh không hợp lệ'),

        body('*.ngaytruc')
            .trim()
            .notEmpty()
            .withMessage('Ngày trực không được để trống')
            .isISO8601()
            .withMessage('Ngày trực không đúng định dạng'),

        body('*.catruc')
            .trim()
            .notEmpty()
            .withMessage('Ca trực không được để trống')
            .isInt({ min: 1, max: 4 })
            .withMessage('Ca trực phải từ 1-4'),

        // Custom validator để kiểm tra toàn bộ dữ liệu
        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array().map((err) => ({
                        field: err.path,
                        message: err.msg,
                    })),
                });
            }

            // Kiểm tra xem có dữ liệu điểm danh không
            const attendanceData = req.body;
            if (!attendanceData || attendanceData.length === 0) {
                return res.status(400).json({
                    success: false,
                    message:
                        'Vui lòng chọn trạng thái điểm danh cho ít nhất một người',
                });
            }

            // Kiểm tra xem tất cả người trong danh sách đều có trạng thái điểm danh
            const missingAttendance = attendanceData.some(
                (item) => !item.diemdanh,
            );
            if (missingAttendance) {
                return res.status(400).json({
                    success: false,
                    message:
                        'Vui lòng chọn trạng thái điểm danh cho tất cả mọi người',
                });
            }
            await attendanceController.create(req, res, next);
        },
    ];
    findByDateAndShift = (req, res, next) => {
        attendanceController.findByDateAndShift(req, res, next);
    };
}

module.exports = new attendanceMiddleware();
