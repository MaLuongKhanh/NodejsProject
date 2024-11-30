const SupportHistory = require('../models/SupportHistory');

class SupportHistoryRepository {
    async findAll() {
        return await SupportHistory.find().sort({ ngaygui: -1 }).lean();
    }

    async countDocuments() {
        return await SupportHistory.countDocuments();
    }

    async findById(id) {
        return await SupportHistory.findById(id);
    }

    async create(data) {
        return await SupportHistory.create(data);
    }

    async update(id, data) {
        return await SupportHistory.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await SupportHistory.findByIdAndDelete(id);
    }

    async findByTechnician(mssv) {
        return await SupportHistory.find({ mssv });
    }
}

module.exports = new SupportHistoryRepository();
