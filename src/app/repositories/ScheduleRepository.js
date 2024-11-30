const Schedule = require('../models/Schedule');

class ScheduleRepository {
    async create(scheduleData) {
        return await Schedule.create(scheduleData);
    }

    async findByUserAndDay(mssv, ngaytrongtuan) {
        return await Schedule.findOne({ mssv, ngaytrongtuan });
    }

    async findByDayAndShift(ngaytrongtuan) {
        try {
            const schedules = await Schedule.aggregate([
                {
                    $match: { ngaytrongtuan: ngaytrongtuan },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'mssv',
                        foreignField: 'mssv',
                        as: 'userInfo',
                    },
                },
                {
                    $unwind: '$userInfo',
                },
                {
                    $project: {
                        mssv: 1,
                        hoten: '$userInfo.hoten',
                        shifts: 1,
                    },
                },
            ]);

            // Tổ chức lại dữ liệu theo ca trực
            const result = {
                1: { [ngaytrongtuan]: [] },
                2: { [ngaytrongtuan]: [] },
                3: { [ngaytrongtuan]: [] },
                4: { [ngaytrongtuan]: [] },
            };

            // Đảm bảo mỗi ca trực có một mảng
            schedules.forEach((schedule) => {
                schedule.shifts.forEach((shift) => {
                    if (!Array.isArray(result[shift.catruc][ngaytrongtuan])) {
                        result[shift.catruc][ngaytrongtuan] = [];
                    }
                    result[shift.catruc][ngaytrongtuan].push({
                        mssv: schedule.mssv,
                        hoten: schedule.hoten,
                    });
                });
            });

            return result;
        } catch (error) {
            console.error('Error in findByDayAndShift:', error);
            throw error;
        }
    }

    async countUsersInShift(ngaytrongtuan, catruc) {
        const schedules = await Schedule.find({
            ngaytrongtuan: ngaytrongtuan,
            'shifts.catruc': catruc,
        });
        return schedules.length;
    }

    async deleteShift(mssv, ngaytrongtuan, catruc) {
        const schedule = await Schedule.findOne({ mssv, ngaytrongtuan });
        if (schedule) {
            schedule.shifts = schedule.shifts.filter(
                (shift) => shift.catruc !== catruc,
            );
            if (schedule.shifts.length === 0) {
                await Schedule.deleteOne({ _id: schedule._id });
            } else {
                await schedule.save();
            }
        }
        return true;
    }

    async findAllSchedules() {
        const schedules = await Schedule.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'mssv',
                    foreignField: 'mssv',
                    as: 'userInfo',
                },
            },
            {
                $unwind: '$userInfo',
            },
            {
                $project: {
                    schedule_id: '$_id',
                    mssv: 1,
                    hoten: '$userInfo.hoten',
                    shifts: 1,
                    ngaytrongtuan: 1,
                },
            },
        ]);

        // Tổ chức lại dữ liệu theo ca trực và ngày
        const result = {
            1: { 2: [], 4: [], 6: [] },
            2: { 2: [], 4: [], 6: [] },
            3: { 2: [], 4: [], 6: [] },
            4: { 2: [], 4: [], 6: [] },
        };

        schedules.forEach((schedule) => {
            schedule.shifts.forEach((shift) => {
                result[shift.catruc][schedule.ngaytrongtuan].push({
                    schedule_id: schedule.schedule_id,
                    mssv: schedule.mssv,
                    hoten: schedule.hoten,
                });
            });
        });

        return result;
    }
}

module.exports = new ScheduleRepository();
