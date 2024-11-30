const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        mssv: {
            type: String,
            required: true,
            unique: true,
        },
        hoten: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phonenumber: {
            type: String,
            required: false,
        },
        ngaysinh: {
            type: Date,
            required: false,
        },
        url: {
            facebookURL: { type: String, required: false },
            githubURL: { type: String, required: false },
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'lead', 'member', 'customer'],
            default: 'customer',
        },
        hide: {
            type: Boolean,
            default: false,
        },
        passwordResetToken: {
            type: String,
            required: false,
        },
        passwordResetExpires: {
            type: Date,
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.index({ mssv: 1 });
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);
