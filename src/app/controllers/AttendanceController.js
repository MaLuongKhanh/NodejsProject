const attendanceService = require('../services/AttendanceService.js');
const scheduleService = require('../services/ScheduleService.js');

class AttendanceController {
    index = (req, res, next) => {
        res.render('attendance');
    };
    async create(req, res) {
        try {
            const attendanceData = req.body;
            console.log('Attendance data:', attendanceData); // Debug log
            await attendanceService.createMany(attendanceData);
            res.json({
                success: true,
                message: 'Điểm danh thành công',
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async findByDateAndShift(req, res) {
        try {
            const { ngaytruc, catruc, ngaytrongtuan } = req.query;

            // Lấy danh sách người đăng ký trực từ lịch trực
            const schedules = await scheduleService.getScheduleByDay(
                parseInt(ngaytrongtuan),
            );
            console.log('Schedules:', schedules); // Debug log

            // Lấy dữ liệu điểm danh đã có
            const attendances = await attendanceService.findByDateAndShift(
                ngaytruc,
                parseInt(catruc),
            );
            console.log('Attendances:', attendances); // Debug log

            // Đảm bảo shiftUsers luôn là một mảng
            let shiftUsers = [];

            // Kiểm tra và lấy danh sách người trực
            if (
                schedules &&
                schedules[catruc] &&
                schedules[catruc][ngaytrongtuan] &&
                Array.isArray(schedules[catruc][ngaytrongtuan])
            ) {
                shiftUsers = schedules[catruc][ngaytrongtuan];
            }

            console.log('ShiftUsers before map:', shiftUsers); // Debug log

            // Merge dữ liệu lịch trực và điểm danh
            const users = Array.isArray(shiftUsers)
                ? shiftUsers.map((user) => ({
                      ...user,
                      diemdanh:
                          attendances.find((a) => a.mssv === user.mssv)
                              ?.diemdanh || null,
                  }))
                : [];

            console.log('Final users:', users); // Debug log

            res.json({
                success: true,
                data: users,
            });
        } catch (error) {
            console.error('Error in findByDateAndShift:', error); // Debug log
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}

module.exports = new AttendanceController();
