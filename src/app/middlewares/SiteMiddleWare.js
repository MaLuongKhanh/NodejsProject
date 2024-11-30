const { body, validationResult } = require('express-validator');
const siteController = require('../controllers/SiteController');

class SiteMiddleware {
    validateSupportRequest = [
        body('studentName')
            .trim()
            .notEmpty()
            .withMessage('Tên sinh viên không được để trống'),
        body('studentId')
            .trim()
            .isLength({ min: 8, max: 8 })
            .withMessage('MSSV phải có 8 ký tự'),
        body('studentEmail').trim().isEmail().withMessage('Email không hợp lệ'),
        body('studentPhone')
            .trim()
            .notEmpty()
            .withMessage('Số điện thoại không được để trống')
            .isLength({ min: 10, max: 10 })
            .withMessage('Số điện thoại phải có 10 ký tự'),
        body('studentDevice')
            .trim()
            .notEmpty()
            .withMessage('Loại máy không được để trống'),
        body('dateSend').isDate().withMessage('Ngày gửi không hợp lệ'),
        body('requestContent')
            .trim()
            .notEmpty()
            .withMessage('Nội dung yêu cầu không được để trống'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const firstError = errors.array()[0];
                return res.status(400).json({
                    success: false,
                    message: firstError.msg,
                    errors: errors.array(),
                });
            }
            next();
        },
    ];

    // Home Page
    index = (req, res, next) => siteController.renderHomePage(req, res, next);

    // Dashboard APIs
    getDashboardStats = (req, res, next) =>
        siteController.getDashboardStats(req, res, next);

    getTechniciansList = (req, res, next) =>
        siteController.getTechniciansList(req, res, next);

    createSupportRequest = [
        ...this.validateSupportRequest,
        (req, res, next) => siteController.createSupportRequest(req, res, next),
    ];

    // TodoList API
    getTodoList = (req, res, next) =>
        siteController.getTodoList(req, res, next);

    createTodo = (req, res, next) => siteController.createTodo(req, res, next);

    toggleTodo = (req, res, next) => siteController.toggleTodo(req, res, next);

    deleteTodo = (req, res, next) => siteController.deleteTodo(req, res, next);

    getAdminTechniciansList = (req, res, next) =>
        siteController.getAdminTechniciansList(req, res, next);

    updateTechnicianRole = (req, res, next) =>
        siteController.updateTechnicianRole(req, res, next);

    updateTechnicianStatus = (req, res, next) =>
        siteController.updateTechnicianStatus(req, res, next);

    renderAdminPage = (req, res, next) => {
        if (req.user.role !== 'admin') {
            return res.redirect('/trang-chu');
        }
        siteController.renderAdminPage(req, res, next);
    };

    getUserDetail = (req, res, next) =>
        siteController.getUserDetail(req, res, next);
}

module.exports = new SiteMiddleware();
