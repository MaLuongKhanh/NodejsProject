const jwt = require('jsonwebtoken');
const authController = require('../controllers/AuthController');
const authService = require('../services/AuthService');
const { body, validationResult } = require('express-validator');

class AuthMiddleware {
    validateRegister = [
        body('hoten')
            .trim()
            .notEmpty()
            .withMessage('Họ tên không được để trống')
            .isLength({ min: 2, max: 50 })
            .withMessage('Họ tên phải từ 2-50 ký tự'),

        body('mssv')
            .trim()
            .notEmpty()
            .withMessage('MSSV không được để trống')
            .isLength({ min: 8, max: 8 })
            .withMessage('MSSV phải có 8 ký tự'),

        body('username')
            .trim()
            .notEmpty()
            .withMessage('Username không được để trống')
            .isLength({ min: 4, max: 20 })
            .withMessage('Username phải từ 4-20 ký tự')
            .matches(/^[a-zA-Z0-9_]+$/)
            .withMessage('Username chỉ được chứa chữ cái, số và dấu gạch dưới'),

        body('email')
            .trim()
            .notEmpty()
            .withMessage('Email không được để trống')
            .isEmail()
            .withMessage('Email không hợp lệ')
            .normalizeEmail(),

        body('password')
            .trim()
            .notEmpty()
            .withMessage('Mật khẩu không được để trống')
            .isLength({ min: 6 })
            .withMessage('Mật khẩu phải có ít nhất 6 ký tự'),

        (req, res, next) => {
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
            next();
        },
    ];

    validateLogin = [
        body('username')
            .trim()
            .notEmpty()
            .withMessage('Username không được để trống'),

        body('password')
            .trim()
            .notEmpty()
            .withMessage('Mật khẩu không được để trống'),

        (req, res, next) => {
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
            next();
        },
    ];

    verifyToken = async (req, res, next) => {
        try {
            const accessToken = req.cookies.accessToken;
            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken) {
                return res.status(404).render('404', {
                    layout: false,
                    script: `
                        <script>
                            setTimeout(() => {
                                window.location.href = '/dang-nhap';
                            }, 2000);
                        </script>
                    `,
                });
            }

            if (!accessToken) {
                try {
                    const { accessToken: newAccessToken, user } =
                        await authService.refreshToken(refreshToken);

                    res.cookie('accessToken', newAccessToken, {
                        httpOnly: true,
                        maxAge: 30 * 60 * 1000,
                    });

                    req.user = user;
                    res.locals.user = user;
                    return next();
                } catch (error) {
                    res.clearCookie('accessToken');
                    res.clearCookie('refreshToken');
                    return res.status(401).json({
                        success: false,
                        message: 'Phiên đăng nhập đã hết hạn',
                    });
                }
            }

            try {
                const decoded = jwt.verify(
                    accessToken,
                    process.env.ACCESS_TOKEN_SECRET,
                );
                req.user = decoded;
                res.locals.user = decoded;
                return next();
            } catch (error) {
                try {
                    const { accessToken: newAccessToken, user } =
                        await authService.refreshToken(refreshToken);

                    res.cookie('accessToken', newAccessToken, {
                        httpOnly: true,
                        maxAge: 30 * 60 * 1000,
                    });

                    req.user = user;
                    res.locals.user = user;
                    return next();
                } catch (error) {
                    res.clearCookie('accessToken');
                    res.clearCookie('refreshToken');
                    return res.status(401).json({
                        success: false,
                        message: 'Phiên đăng nhập đã hết hạn',
                    });
                }
            }
        } catch (error) {
            return res.status(500).render('500', { layout: false });
        }
    };

    handleLogin = (req, res, next) => {
        authController.handleLogin(req, res, next);
    };

    handleRegister = (req, res, next) => {
        authController.handleRegister(req, res, next);
    };

    login = (req, res, next) => {
        authController.login(req, res, next);
    };

    register = (req, res, next) => {
        authController.register(req, res, next);
    };

    handleLogout = (req, res, next) => {
        authController.handleLogout(req, res, next);
    };

    refreshToken = async (req, res, next) => {
        try {
            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken) {
                return res.status(401).json({
                    success: false,
                    message: 'Refresh token không tồn tại',
                });
            }

            try {
                const decoded = jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
                );
                req.userId = decoded.id;
                req.refreshToken = refreshToken;
                return authController.refreshToken(req, res, next);
            } catch (error) {
                res.clearCookie('accessToken');
                res.clearCookie('refreshToken');
                return res.status(401).json({
                    success: false,
                    message: 'Refresh token không hợp lệ',
                });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server',
            });
        }
    };

    checkAuth = (req, res, next) => {
        authController.checkAuth(req, res, next);
    };

    handleForgotPassword = [
        body('email')
            .trim()
            .notEmpty()
            .withMessage('Email không được để trống')
            .isEmail()
            .withMessage('Email không hợp lệ'),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }
            authController.handleForgotPassword(req, res, next);
        },
    ];

    handleResetPassword = [
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Mật khẩu không được để trống')
            .isLength({ min: 6 })
            .withMessage('Mật khẩu phải có ít nhất 6 ký tự'),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }
            authController.handleResetPassword(req, res, next);
        },
    ];

    forgotPassword = (req, res, next) => {
        authController.forgotPassword(req, res, next);
    };

    resetPassword = (req, res, next) => {
        authController.resetPassword(req, res, next);
    };
}

module.exports = new AuthMiddleware();
