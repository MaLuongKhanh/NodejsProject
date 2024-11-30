const profileService = require('../services/ProfileService');
const path = require('path');
const fs = require('fs');

class ProfileController {
    async index(req, res) {
        res.render('profile');
    }

    async profileData(req, res) {
        try {
            const profile = await profileService.getProfile(req.user.mssv);
            if (!profile) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy thông tin người dùng',
                });
            }
            res.json({
                success: true,
                data: profile,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy thông tin người dùng',
            });
        }
    }

    async updateProfile(req, res) {
        try {
            const updatedProfile = await profileService.updateProfile(
                req.user.mssv,
                req.body,
            );
            res.json({
                success: true,
                message: 'Cập nhật thành công',
                data: updatedProfile,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async updateAvatar(req, res) {
        try {
            const oldProfile = await profileService.getProfile(req.user.mssv);
            const avatarPath = `/uploads/avatars/${req.file.filename}`;

            // Delete old avatar if exists
            if (oldProfile.avatar) {
                const oldAvatarPath = path.join(
                    __dirname,
                    '../..',
                    'public',
                    oldProfile.avatar,
                );
                if (fs.existsSync(oldAvatarPath)) {
                    fs.unlinkSync(oldAvatarPath);
                }
            }

            const updatedProfile = await profileService.updateAvatar(
                req.user.mssv,
                avatarPath,
            );
            res.json({
                success: true,
                message: 'Cập nhật ảnh đại diện thành công',
                data: updatedProfile,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}

module.exports = new ProfileController();
