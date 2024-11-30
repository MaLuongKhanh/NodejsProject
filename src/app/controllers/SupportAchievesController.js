const supportAchievesService = require('../services/SupportAchievesService.js');

class SupportAchievesController {
    index = (req, res) => {
        res.render('supportAchieves');
    };
    async getTopSupportTechnicians(req, res) {
        try {
            const topSupportTechnicians =
                await supportAchievesService.getTopSupportTechnicians();
            res.json({
                success: true,
                data: topSupportTechnicians,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy danh sách kỹ thuật viên',
            });
        }
    }
    async getTopAttendanceTechnicians(req, res) {
        try {
            const topAttendanceTechnicians =
                await supportAchievesService.getTopAttendanceTechnicians();
            res.json({
                success: true,
                data: topAttendanceTechnicians,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy danh sách kỹ thuật viên',
            });
        }
    }
}

module.exports = new SupportAchievesController();
