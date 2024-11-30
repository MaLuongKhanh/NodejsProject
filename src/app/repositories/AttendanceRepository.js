const attendance = require('../models/Attendance');

class attendanceRepository {
    async findByDateAndShift(ngaytruc, catruc) {
        return await attendance
            .find({
                ngaytruc: new Date(ngaytruc),
                catruc: catruc,
            })
            .select('mssv diemdanh');
    }

    async bulkWrite(operations) {
        return await attendance.bulkWrite(operations);
    }
}

module.exports = new attendanceRepository();
