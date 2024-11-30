const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const authRepository = require('../repositories/AuthRepository');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

class AuthService {
    async register(userData) {
        // Validate required fields
        const requiredFields = [
            'hoten',
            'mssv',
            'username',
            'password',
            'email',
        ];
        for (const field of requiredFields) {
            if (!userData[field]) {
                throw new Error(`${field} is required`);
            }
        }

        // Check if username or email or mssv already exists
        const existingUser = await authRepository.findExistingUser(
            userData.username,
            userData.email,
            userData.mssv,
        );
        if (existingUser) {
            if (existingUser.username === userData.username) {
                throw new Error('Username already exists');
            }
            if (existingUser.email === userData.email) {
                throw new Error('Email already exists');
            }
            if (existingUser.mssv === userData.mssv) {
                throw new Error('MSSV already exists');
            }
        }

        // Create new user with required fields
        const newUser = {
            hoten: userData.hoten,
            mssv: userData.mssv,
            username: userData.username,
            password: userData.password,
            email: userData.email,
            role: 'customer',
        };

        return await authRepository.createUser(newUser);
    }

    async login(username, password) {
        const user = await authRepository.findUserByUsername(username);

        // Kiểm tra user tồn tại
        if (!user) {
            throw new Error('Tài khoản hoặc mật khẩu không chính xác!');
        }

        // Kiểm tra tài khoản bị khóa
        if (user.hide) {
            throw new Error(
                'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Admin để được hỗ trợ!',
            );
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Tài khoản hoặc mật khẩu không chính xác!');
        }

        const tokenPayload = {
            id: user._id,
            username: user.username,
            role: user.role,
            mssv: user.mssv,
        };

        const accessToken = jwt.sign(
            tokenPayload,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' },
        );

        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' },
        );

        return {
            accessToken,
            refreshToken,
            user: {
                username: user.username,
                hoten: user.hoten,
                mssv: user.mssv,
                email: user.email,
                role: user.role,
            },
        };
    }

    async refreshToken(token) {
        try {
            const decoded = jwt.decode(token);
            const user = await authRepository.findUserById(decoded.id);

            if (!user) {
                throw new Error('User not found');
            }

            const accessToken = jwt.sign(
                {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                    mssv: user.mssv,
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' },
            );

            return {
                accessToken,
                user,
            };
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }

    async forgotPassword(email) {
        const user = await authRepository.findUserByEmail(email);
        if (!user) {
            throw new Error('Email không tồn tại trong hệ thống');
        }
        const token = crypto.randomBytes(20).toString('hex');
        const expires = Date.now() + 3600000; // 1 hour

        try {
            await authRepository.updatePasswordResetToken(
                email,
                token,
                expires,
            );
        } catch (error) {
            throw new Error('Lỗi khi cập nhật token đặt lại mật khẩu');
        }

        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });

            const info = await transporter.sendMail({
                from: `"IT Center 👨‍💻" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'Khôi phục mật khẩu',
                html: `
                    <div style="background-color: #f6f6f6; padding: 20px;">
                        <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
                            <h2 style="color: #333;">Khôi phục mật khẩu</h2>
                            <p>Bạn đã yêu cầu khôi phục mật khẩu.</p>
                            <p>Click vào link sau để đặt lại mật khẩu:</p>
                            <a href="${process.env.BASE_URL}/quen-mat-khau/reset-password/${token}" 
                                style="background-color: #007bff; color: #fff; padding: 10px 20px; 
                                        text-decoration: none; border-radius: 5px; display: inline-block;">
                                Đặt lại mật khẩu
                            </a>
                            <p style="margin-top: 20px;">Link này sẽ hết hạn sau 1 giờ.</p>
                        </div>
                    </div>
                `,
            });

            return true;
        } catch (error) {
            console.error('Email error:', error);
            throw new Error('Lỗi khi gửi email khôi phục mật khẩu');
        }
    }
    catch(error) {
        console.error('Forgot password error:', error);
        throw error;
    }

    async resetPassword(token, newPassword) {
        const user = await authRepository.resetPassword(token, newPassword);
        if (!user) {
            throw new Error('Token không hợp lệ hoặc đã hết hạn');
        }
        return true;
    }

    async checkResetToken(token) {
        try {
            const user = await authRepository.findUserByResetToken(token);

            if (!user) {
                return null;
            }

            // Kiểm tra token đã hết hạn chưa
            if (user.passwordResetExpires < Date.now()) {
                return null;
            }

            return user;
        } catch (error) {
            console.error('Check reset token error:', error);
            return null;
        }
    }
}
module.exports = new AuthService();
