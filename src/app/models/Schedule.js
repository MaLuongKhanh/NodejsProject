const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema(
    {
        mssv: {
            type: String,
            ref: 'User',
            required: true,
        },
        ngaytrongtuan: {
            type: Number,
            min: 2,
            max: 8,
            required: true,
        },
        shifts: [
            {
                catruc: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 4,
                },
            },
        ],
        meta: String,
        hide: {
            type: Boolean,
            default: false,
        },
        ngaydangki: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    },
);

// Index để tối ưu truy vấn
ScheduleSchema.index({ mssv: 1, ngaytrongtuan: 1 });
ScheduleSchema.index({ 'shifts.catruc': 1 });

module.exports = mongoose.model('Schedule', ScheduleSchema);
