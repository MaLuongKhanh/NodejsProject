const softwareRepo = require('../repositories/SoftwareStorageRepository');

class SoftwareStorageService {
    async getAllSoftware() {
        return await softwareRepo.findAll();
    }

    async createSoftware(data, mssv) {
        data.mssv = mssv;
        return await softwareRepo.create(data);
    }

    async updateSoftware(id, data, mssv, role) {
        const software = await softwareRepo.findById(id);
        if (!software) throw new Error('Không tìm thấy phần mềm');
        if (software.mssv !== mssv && role !== 'admin') {
            throw new Error('Không có quyền chỉnh sửa');
        }
        return await softwareRepo.update(id, data);
    }

    async deleteSoftware(id, mssv) {
        const software = await softwareRepo.findById(id);
        if (!software) throw new Error('Không tìm thấy phần mềm');
        if (software.mssv !== mssv) {
            throw new Error('Không có quyền xóa');
        }
        return await softwareRepo.delete(id);
    }
}

module.exports = new SoftwareStorageService();
