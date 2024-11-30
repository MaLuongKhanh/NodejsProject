const changePasswordService = require('../services/ChangePasswordService');

class ChangePasswordController {
    index(req, res) {
        res.render('changePassword', { layout: 'login' });
    }

    async update(req, res) {
        try {
            const { currentPassword, newPassword } = req.body;
            const mssv = req.user.mssv;

            await changePasswordService.updatePassword(
                mssv,
                currentPassword,
                newPassword,
            );

            // Xóa cả accessToken và refreshToken
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');

            res.json({
                success: true,
                message: 'Đổi mật khẩu thành công',
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message || 'Lỗi khi đổi mật khẩu',
            });
        }
    }
}

module.exports = new ChangePasswordController();
