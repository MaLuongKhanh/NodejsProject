const authService = require('../services/AuthService');
const jwt = require('jsonwebtoken');

class AuthController {
    // GET methods
    login = (req, res) => {
        res.render('login', { layout: 'login' });
    };

    register = (req, res) => {
        res.render('register', { layout: 'login' });
    };

    forgotPassword = (req, res) => {
        res.render('forgotPassword', { layout: 'login' });
    };

    // POST methods
    handleLogin = async (req, res) => {
        try {
            const { accessToken, refreshToken, user } = await authService.login(
                req.body.username,
                req.body.password,
            );

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000,
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            let redirectUrl;
            switch (user.role) {
                case 'admin':
                    redirectUrl = '/admin';
                    break;
                case 'customer':
                    redirectUrl = '/';
                    break;
                default:
                    redirectUrl = '/trang-chu';
            }

            res.json({
                success: true,
                message: 'Đăng nhập thành công!',
                user,
                redirectUrl,
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message,
            });
        }
    };

    handleRegister = async (req, res) => {
        try {
            const user = await authService.register(req.body);

            res.status(201).json({
                success: true,
                message: 'Đăng ký thành công!',
                user: {
                    username: user.username,
                    hoten: user.hoten,
                    mssv: user.mssv,
                    email: user.email,
                },
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    };

    handleLogout = async (req, res) => {
        try {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');

            res.json({
                success: true,
                message: 'Đăng xuất thành công!',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };

    refreshToken = async (req, res) => {
        try {
            const { accessToken, user } = await authService.refreshToken(
                req.refreshToken,
            );

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000,
            });

            return res.status(200).json({
                success: true,
                message: 'Refresh token thành công',
                user: {
                    username: user.username,
                    role: user.role,
                    mssv: user.mssv,
                },
            });
        } catch (error) {
            //console.log("Hello Controller");
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            return res.status(401).json({
                success: false,
                message: 'Phiên đăng nhập đã hết hạn',
            });
        }
    };

    checkAuth = async (req, res) => {
        try {
            res.locals.user = req.user;
            return res.status(200).json({
                success: true,
                user: {
                    username: req.user.username,
                    role: req.user.role,
                    mssv: req.user.mssv,
                },
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
            });
        }
    };

    handleForgotPassword = async (req, res) => {
        try {
            await authService.forgotPassword(req.body.email);
            res.status(200).json({
                success: true,
                message:
                    'Hướng dẫn khôi phục mật khẩu đã được gửi đến email của bạn',
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    };

    handleResetPassword = async (req, res) => {
        try {
            await authService.resetPassword(
                req.params.token,
                req.body.password,
            );
            res.json({
                success: true,
                message: 'Đặt lại mật khẩu thành công',
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    };

    resetPassword = async (req, res) => {
        try {
            const token = req.params.token;
            const user = await authService.checkResetToken(token);

            if (!user) {
                return res.render('error', {
                    layout: 'login',
                    message:
                        'Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn',
                });
            }

            res.render('resetPassword', {
                layout: 'login',
                token: token,
            });
        } catch (error) {
            res.render('error', {
                layout: 'login',
                message: error.message,
            });
        }
    };
}

module.exports = new AuthController();
