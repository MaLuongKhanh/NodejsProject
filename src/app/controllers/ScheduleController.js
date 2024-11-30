const scheduleService = require('../services/ScheduleService');

class ScheduleController {
    async index(req, res) {
        res.render('scheduleRegister', {
            currentUser: {
                mssv: req.user.mssv,
                username: req.user.username,
                role: req.user.role,
            },
        });
    }

    async register(req, res) {
        try {
            const { ngaytrongtuan, catruc } = req.body;

            const schedule = await scheduleService.registerShift(
                req.user.mssv,
                ngaytrongtuan,
                { catruc },
            );

            res.json({
                success: true,
                message: 'Đăng ký ca trực thành công',
                data: schedule,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getSchedule(req, res) {
        try {
            const schedule = await scheduleService.getAllSchedules();
            console.log('controller', schedule);
            res.json({
                success: true,
                data: schedule,
            });
        } catch (error) {
            console.log('controller error', error);
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async cancelShift(req, res) {
        try {
            const { ngaytrongtuan, catruc } = req.params;
            await scheduleService.cancelShift(
                req.user.mssv,
                parseInt(ngaytrongtuan),
                parseInt(catruc),
            );

            res.json({
                success: true,
                message: 'Hủy ca trực thành công',
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}

module.exports = new ScheduleController();
