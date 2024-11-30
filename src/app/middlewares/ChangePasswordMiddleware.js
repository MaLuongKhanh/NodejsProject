const { body, validationResult } = require('express-validator');
const changePasswordController = require('../controllers/ChangePasswordController');

class ChangePasswordMiddleware {
    index(req, res) {
        changePasswordController.index(req, res);
    }

    update = [
        body('currentPassword')
            .trim()
            .notEmpty()
            .withMessage('Mật khẩu hiện tại không được để trống'),

        body('newPassword')
            .trim()
            .notEmpty()
            .withMessage('Mật khẩu mới không được để trống')
            .isLength({ min: 6 })
            .withMessage('Mật khẩu mới phải có ít nhất 6 ký tự'),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: errors.array()[0].msg,
                });
            }
            changePasswordController.update(req, res, next);
        },
    ];
}

module.exports = new ChangePasswordMiddleware();
