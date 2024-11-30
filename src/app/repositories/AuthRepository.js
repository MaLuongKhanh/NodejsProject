const User = require('../models/User');

class AuthRepository {
    async createUser(userData) {
        return await User.create(userData);
    }

    async findUserByUsername(username) {
        return await User.findOne({ username });
    }

    async findExistingUser(username, email, mssv) {
        return await User.findOne({
            $or: [{ username: username }, { email: email }, { mssv: mssv }],
        });
    }

    async findUserById(id) {
        return await User.findById(id);
    }

    async findUserByEmail(email) {
        return await User.findOne({ email });
    }

    async updatePasswordResetToken(email, token, expires) {
        return await User.findOneAndUpdate(
            { email },
            {
                passwordResetToken: token,
                passwordResetExpires: expires,
            },
            { new: true },
        );
    }

    async resetPassword(token, newPassword) {
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() },
        });

        if (!user) return null;

        user.password = newPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        return user;
    }

    async findUserByResetToken(token) {
        return await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() },
        });
    }
}

module.exports = new AuthRepository();
