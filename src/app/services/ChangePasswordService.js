const ChangePasswordRepository = require('../repositories/ChangePasswordRepository');

class ChangePasswordService {
    async updatePassword(userId, currentPassword, newPassword) {
        return await ChangePasswordRepository.updatePassword(
            userId,
            currentPassword,
            newPassword,
        );
    }
}

module.exports = new ChangePasswordService();
