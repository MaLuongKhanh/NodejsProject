const newsRepository = require('../repositories/NewsRepository');

class NewsService {
    // Lấy tất cả tin tức (không bị ẩn)
    async getAllNews() {
        try {
            return await newsRepository.getAll();
        } catch (error) {
            console.error(error);
            throw new Error('Lỗi khi lấy danh sách tin tức');
        }
    }

    // Lấy tất cả tin tức (bao gồm cả bị ẩn)
    async getAllNewsWithHidden() {
        try {
            return await newsRepository.getAllWithHidden();
        } catch (error) {
            throw new Error('Lỗi khi lấy danh sách tin tức');
        }
    }

    // Lấy tin tức theo ID
    async getNewsById(id) {
        try {
            const news = await newsRepository.getById(id);
            if (!news) {
                throw new Error('Không tìm thấy tin tức');
            }
            return news;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Tạo tin tức mới
    async createNews(newsData) {
        try {
            // Validate dữ liệu
            if (!newsData.title || !newsData.content) {
                throw new Error('Tiêu đề và nội dung không được để trống');
            }

            if (!newsData.order) {
                newsData.order = 0;
            }

            return await newsRepository.create(newsData);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Cập nhật tin tức
    async updateNews(id, newsData) {
        try {
            const news = await newsRepository.getById(id);
            if (!news) {
                throw new Error('Không tìm thấy tin tức');
            }

            return await newsRepository.update(id, newsData);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Xóa mềm tin tức
    async softDeleteNews(id) {
        try {
            const news = await newsRepository.getById(id);
            if (!news) {
                throw new Error('Không tìm thấy tin tức');
            }

            return await newsRepository.update(id, {
                hide: true,
                order: -1,
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Khôi phục tin tức
    async restoreNews(id) {
        try {
            const news = await newsRepository.getById(id);
            if (!news) {
                throw new Error('Không tìm thấy tin tức');
            }

            return await newsRepository.update(id, {
                hide: false,
                order: 0,
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Thêm method để ghim/gỡ ghim
    async togglePin(id, isPinned) {
        try {
            const news = await newsRepository.getById(id);
            if (!news) {
                throw new Error('Không tìm thấy tin tức');
            }

            const order = isPinned ? 999 : 0; // Số càng lớn càng ưu tiên hiển thị trên đầu
            return await newsRepository.update(id, { order });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new NewsService();
