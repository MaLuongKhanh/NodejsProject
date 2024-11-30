const attendanceRepository = require('../repositories/AttendanceRepository');

class AttendanceServices {
    async findByDateAndShift(ngaytruc, catruc) {
        return await attendanceRepository.findByDateAndShift(ngaytruc, catruc);
    }

    async createMany(attendanceDataArray) {
        try {
            const operations = attendanceDataArray.map((data) => ({
                updateOne: {
                    filter: {
                        mssv: data.mssv,
                        ngaytruc: new Date(data.ngaytruc),
                        catruc: data.catruc,
                    },
                    update: {
                        $set: {
                            diemdanh: data.diemdanh,
                            updatedAt: new Date(),
                        },
                    },
                    upsert: true,
                },
            }));

            return await attendanceRepository.bulkWrite(operations);
        } catch (error) {
            console.error('Error in createMany:', error);
            throw error;
        }
    }
}

module.exports = new AttendanceServices();
