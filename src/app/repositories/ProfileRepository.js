const User = require('../models/User');

class ProfileRepository {
    async getProfile(mssv) {
        return await User.findOne({ mssv });
    }

    async updateProfile(mssv, updateData) {
        const updateObj = {};

        // Check if fields exist in updateData (including empty strings)
        if (updateData.hoten !== undefined) updateObj.hoten = updateData.hoten;
        if (updateData.email !== undefined) updateObj.email = updateData.email;
        if (updateData.phonenumber !== undefined)
            updateObj.phonenumber = updateData.phonenumber;
        if (updateData.ngaysinh !== undefined)
            updateObj.ngaysinh = updateData.ngaysinh;

        // Handle nested url object
        if (updateData.url) {
            if (updateData.url.facebookURL !== undefined) {
                updateObj['url.facebookURL'] = updateData.url.facebookURL;
            }
            if (updateData.url.githubURL !== undefined) {
                updateObj['url.githubURL'] = updateData.url.githubURL;
            }
        }

        if (updateData.avatar !== undefined)
            updateObj.avatar = updateData.avatar;

        return User.findOneAndUpdate(
            { mssv },
            { $set: updateObj },
            {
                new: true,
                lean: true,
                projection: {
                    hoten: 1,
                    email: 1,
                    phonenumber: 1,
                    ngaysinh: 1,
                    'url.facebookURL': 1,
                    'url.githubURL': 1,
                    avatar: 1,
                },
            },
        );
    }
}

module.exports = new ProfileRepository();
