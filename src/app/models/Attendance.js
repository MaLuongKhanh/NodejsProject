const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema(
    {
        diemdanh: String,
        ngaytruc: { type: Date, required: true },
        catruc: { type: Number, required: true },
        meta: String,
        hide: Boolean,
        mssv: {
            type: String,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Attendance', AttendanceSchema);
