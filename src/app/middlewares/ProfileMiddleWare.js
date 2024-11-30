const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const upload = require('../../config/multer.js');
const profileController = require('../controllers/ProfileController.js');

class ProfileMiddleware {
    validateProfile = [
        body('hoten')
            .trim()
            .notEmpty()
            .withMessage('Họ tên không được để trống')
            .isLength({ min: 2, max: 50 })
            .withMessage('Họ tên phải từ 2-50 ký tự'),

        body('email')
            .trim()
            .notEmpty()
            .withMessage('Email không được để trống')
            .isEmail()
            .withMessage('Email không hợp lệ')
            .normalizeEmail(),

        body('phonenumber')
            .optional({ nullable: true, checkFalsy: true })
            .custom((value) => {
                if (!value) return true;
                return (
                    value.length >= 10 &&
                    value.length <= 11 &&
                    /^\+?[0-9]+$/.test(value)
                );
            })
            .withMessage('Số điện thoại phải có 10 ký tự'),

        body('ngaysinh')
            .optional({ nullable: true, checkFalsy: true })
            .custom((value) => {
                if (!value) return true;
                return !isNaN(Date.parse(value));
            })
            .withMessage('Ngày sinh không hợp lệ'),

        body('url.facebookURL')
            .optional({ nullable: true, checkFalsy: true })
            .isURL()
            .withMessage('URL Facebook không hợp lệ'),

        body('url.githubURL')
            .optional({ nullable: true, checkFalsy: true })
            .isURL()
            .withMessage('URL Github không hợp lệ'),

        // Middleware kiểm tra lỗi validation
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

    updateAvatar = [
        (req, res, next) => {
            upload.single('avatar')(req, res, (err) => {
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({
                        success: false,
                        message: 'Lỗi khi tải file: ' + err.message,
                    });
                } else if (err) {
                    return res.status(400).json({
                        success: false,
                        message: err.message,
                    });
                }
                next();
            });
        },
        (req, res, next) => profileController.updateAvatar(req, res, next),
    ];

    index = (req, res, next) => {
        profileController.index(req, res, next);
    };

    profileData = (req, res, next) => {
        profileController.profileData(req, res, next);
    };

    updateProfile = [
        ...this.validateProfile,
        (req, res, next) => {
            profileController.updateProfile(req, res, next);
        },
    ];
}

module.exports = new ProfileMiddleware();
