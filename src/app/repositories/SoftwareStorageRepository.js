const SoftwareStorage = require('../models/SoftwareStorage');

class SoftwareStorageRepository {
    async findAll() {
        return await SoftwareStorage.find().sort({ ngaydang: -1 });
    }

    async findById(id) {
        return await SoftwareStorage.findById(id);
    }

    async create(data) {
        const software = new SoftwareStorage(data);
        return await software.save();
    }

    async update(id, data) {
        return await SoftwareStorage.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await SoftwareStorage.findByIdAndDelete(id);
    }
}

module.exports = new SoftwareStorageRepository();
