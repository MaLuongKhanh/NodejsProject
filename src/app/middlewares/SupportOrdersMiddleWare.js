const supportOrdersController = require('../controllers/SupportOrdersController');
const { body, validationResult } = require('express-validator');

class SupportOrdersMiddleWare {
    // Validate yêu cầu hỗ trợ
    validateSupportRequest = [
        body('hoten')
            .trim()
            .notEmpty()
            .withMessage('Họ tên không được để trống'),
        body('maKH')
            .trim()
            .isLength({ min: 8, max: 8 })
            .withMessage('Mã khách hàng phải có 8 ký tự'),
        body('sdt')
            .optional()
            .trim()
            .matches(/^[0-9]{10,11}$/)
            .withMessage('Số điện thoại không hợp lệ'),
        body('email')
            .optional()
            .trim()
            .isEmail()
            .withMessage('Email không hợp lệ'),
        body('tenmay')
            .trim()
            .notEmpty()
            .withMessage('Tên máy không được để trống'),
        body('loaihotro')
            .trim()
            .notEmpty()
            .withMessage('Loại hỗ trợ không được để trống'),
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }
            next();
        },
    ];

    index = async (req, res, next) => {
        await supportOrdersController.index(req, res, next);
    };
    getAllOrders = async (req, res, next) => {
        await supportOrdersController.getAllOrders(req, res, next);
    };
    updateStatus = async (req, res, next) => {
        this.validateSupportRequest;
        await supportOrdersController.updateStatus(req, res, next);
    };
    updateOrder = async (req, res, next) => {
        this.validateSupportRequest;
        await supportOrdersController.updateOrder(req, res, next);
    };
    deleteOrder = async (req, res, next) => {
        this.validateSupportRequest;
        await supportOrdersController.deleteOrder(req, res, next);
    };
}

module.exports = new SupportOrdersMiddleWare();
