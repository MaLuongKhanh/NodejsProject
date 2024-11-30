const mongoose = require('mongoose');
const User = require('../models/User');
const Attendance = require('../models/Attendance');
const SupportHistory = require('../models/SupportHistory');

class SupportAchievesRepository {
    async getTopSupportTechnicians() {
        try {
            const topSupporters = await SupportHistory.aggregate([
                {
                    $match: {
                        trangthai: 'bàn giao máy', // Chỉ lấy những máy đã bàn giao
                    },
                },
                {
                    $group: {
                        _id: '$mssv',
                        supportCount: { $sum: 1 }, // Đếm số lần hỗ trợ
                    },
                },
                { $sort: { supportCount: -1 } }, // Sắp xếp giảm dần theo số lượng hỗ trợ
                { $limit: 5 }, // Giới hạn 5 kỹ thuật viên đứng đầu
            ]);

            // Gắn thêm thông tin họ tên từ model User
            for (const supporter of topSupporters) {
                const user = await User.findOne({ mssv: supporter._id });
                if (user) {
                    supporter.hoten = user.hoten;
                }
            }

            return topSupporters;
        } catch (error) {
            console.error('Error in getTopSupportTechnicians:', error);
            throw error;
        }
    }

    async getTopAttendanceTechnicians() {
        try {
            const topAttendees = await Attendance.aggregate([
                {
                    $match: {
                        diemdanh: { $in: ['present', 'late'] }, // Chỉ đếm khi có mặt hoặc trễ
                    },
                },
                {
                    $group: {
                        _id: '$mssv',
                        attendanceCount: { $sum: 1 }, // Đếm số ngày đi trực
                    },
                },
                { $sort: { attendanceCount: -1 } }, // Sắp xếp giảm dần theo số lần đi trực
                { $limit: 5 }, // Giới hạn 5 kỹ thuật viên đứng đầu
            ]);

            // Gắn thêm thông tin họ tên từ model User
            for (const attendee of topAttendees) {
                const user = await User.findOne({ mssv: attendee._id });
                if (user) {
                    attendee.hoten = user.hoten;
                }
            }

            return topAttendees;
        } catch (error) {
            console.error('Error in getTopAttendanceTechnicians:', error);
            throw error;
        }
    }
}

module.exports = new SupportAchievesRepository();
