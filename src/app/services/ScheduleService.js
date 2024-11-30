const scheduleRepository = require('../repositories/ScheduleRepository');

class ScheduleService {
    async registerShift(mssv, ngaytrongtuan, shiftData) {
        const userCount = await scheduleRepository.countUsersInShift(
            ngaytrongtuan,
            shiftData.catruc,
        );

        if (userCount >= 6) {
            throw new Error('Ca trực đã đủ số lượng kỹ thuật viên');
        }

        const existingSchedule = await scheduleRepository.findByUserAndDay(
            mssv,
            ngaytrongtuan,
        );

        if (existingSchedule) {
            const hasShift = existingSchedule.shifts.some(
                (shift) => shift.catruc === shiftData.catruc,
            );
            if (hasShift) {
                throw new Error('Bạn đã đăng ký ca trực này');
            }

            existingSchedule.shifts.push(shiftData);
            await existingSchedule.save();
        } else {
            await scheduleRepository.create({
                mssv,
                ngaytrongtuan,
                shifts: [shiftData],
            });
        }

        return await this.getScheduleByDay(ngaytrongtuan);
    }

    async getScheduleByDay(ngaytrongtuan) {
        try {
            const schedules =
                await scheduleRepository.findByDayAndShift(ngaytrongtuan);

            // Trả về cấu trúc đúng
            const result = {
                1: { 2: [], 4: [], 6: [] },
                2: { 2: [], 4: [], 6: [] },
                3: { 2: [], 4: [], 6: [] },
                4: { 2: [], 4: [], 6: [] },
            };

            // Merge dữ liệu từ schedules vào result
            if (schedules) {
                Object.keys(schedules).forEach((catruc) => {
                    if (schedules[catruc] && schedules[catruc][ngaytrongtuan]) {
                        result[catruc][ngaytrongtuan] =
                            schedules[catruc][ngaytrongtuan];
                    }
                });
            }

            return result;
        } catch (error) {
            console.error('Error in getScheduleByDay:', error); // Debug log
            throw error;
        }
    }

    async cancelShift(mssv, ngaytrongtuan, catruc) {
        await scheduleRepository.deleteShift(mssv, ngaytrongtuan, catruc);
        return await this.getScheduleByDay(ngaytrongtuan);
    }

    async getAllSchedules() {
        return await scheduleRepository.findAllSchedules();
    }
}

module.exports = new ScheduleService();
