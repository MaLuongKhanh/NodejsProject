const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupportHistorySchema = new Schema(
    {
        hoten: { type: String, required: true },
        maKH: { type: String, required: true },
        sdt: String,
        email: String,
        tenmay: { type: String, required: true },
        loaihotro: { type: String, required: true },
        matkhau: String,
        ngaygui: { type: Date, default: Date.now },
        trangthai: {
            type: String,
            enum: ['chờ', 'tiếp nhận', 'bàn giao máy', 'từ chối'],
            default: 'chờ',
        },
        meta: String,
        hide: Boolean,
        mssv: {
            type: String,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('SupportHistory', SupportHistorySchema);
