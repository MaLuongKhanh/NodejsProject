const News = require('../models/News');

class NewsRepository {
    async getAll() {
        return await News.find({ hide: false })
            .sort({ order: -1, createdAt: -1 })
            .lean();
    }

    async getAllWithHidden() {
        return await News.find().sort({ order: -1, createdAt: -1 }).lean();
    }

    async getById(id) {
        return await News.findById(id).lean();
    }

    async create(newsData) {
        const news = new News(newsData);
        return await news.save();
    }

    async update(id, updateData) {
        return await News.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
    }

    async delete(id) {
        return await News.findByIdAndDelete(id);
    }
}

module.exports = new NewsRepository();
