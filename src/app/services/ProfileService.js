const profileRepository = require('../repositories/ProfileRepository');

class ProfileService {
    async getProfile(mssv) {
        return await profileRepository.getProfile(mssv);
    }

    async updateProfile(mssv, updateData) {
        return await profileRepository.updateProfile(mssv, updateData);
    }

    async updateAvatar(mssv, avatarPath) {
        return await profileRepository.updateProfile(mssv, {
            avatar: avatarPath,
        });
    }
}

module.exports = new ProfileService();
