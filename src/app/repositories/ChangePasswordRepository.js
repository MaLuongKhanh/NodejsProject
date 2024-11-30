const User = require('../models/User');
const bcrypt = require('bcrypt');

class ChangePasswordRepository {
    async updatePassword(mssv, currentPassword, newPassword) {
        const user = await User.findOne({ mssv });
        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            throw new Error('Mật khẩu hiện tại không đúng');
        }

        user.password = newPassword; // Password will be hashed by User model pre-save middleware
        await user.save();

        return true;
    }
}

module.exports = new ChangePasswordRepository();
