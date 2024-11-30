const NewsService = require('../services/NewsService');
const fs = require('fs');
const path = require('path');

class NewsController {
    async index(req, res) {
        res.render('admin_news', {
            layout: 'main',
            currentUser: req.user,
        });
    }

    async getAllNews(req, res) {
        try {
            const news = await NewsService.getAllNews();
            res.json({
                success: true,
                data: news,
            });
        } catch (error) {
            console.error(error);
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy danh sách tin tức',
            });
        }
    }

    async getAllNewsWithHidden(req, res) {
        try {
            const news = await NewsService.getAllNewsWithHidden();
            res.json({
                success: true,
                data: news,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy danh sách tin tức',
            });
        }
    }

    async getNewsById(req, res) {
        try {
            const news = await NewsService.getNewsById(req.params.id);
            if (!news) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy tin tức',
                });
            }
            res.json({
                success: true,
                data: news,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy tin tức',
            });
        }
    }

    async createNews(req, res) {
        try {
            if (req.file) {
                req.body.image = '/uploads/news/' + req.file.filename;
            }

            const news = await NewsService.createNews(req.body);
            res.status(201).json({
                success: true,
                message: 'Tạo tin tức thành công',
                data: news,
            });
        } catch (error) {
            if (req.file) {
                const imagePath = path.join(
                    __dirname,
                    '../../public/uploads/news',
                    req.file.filename,
                );
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async updateNews(req, res) {
        try {
            const oldNews = await NewsService.getNewsById(req.params.id);
            if (!oldNews) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy tin tức',
                });
            }

            if (req.file) {
                req.body.image = '/uploads/news/' + req.file.filename;
            }

            const news = await NewsService.updateNews(req.params.id, req.body);

            if (req.file && oldNews.image) {
                const oldImagePath = path.join(
                    __dirname,
                    '../../public',
                    oldNews.image,
                );
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            res.json({
                success: true,
                message: 'Cập nhật tin tức thành công',
                data: news,
            });
        } catch (error) {
            if (req.file) {
                const imagePath = path.join(
                    __dirname,
                    '../../public/uploads/news',
                    req.file.filename,
                );
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async deleteNews(req, res) {
        try {
            await NewsService.softDeleteNews(req.params.id);
            res.json({
                success: true,
                message: 'Xóa tin tức thành công',
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async restoreNews(req, res) {
        try {
            await NewsService.restoreNews(req.params.id);
            res.json({
                success: true,
                message: 'Khôi phục tin tức thành công',
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async togglePin(req, res) {
        try {
            const news = await NewsService.togglePin(
                req.params.id,
                req.body.isPinned,
            );
            res.json({
                success: true,
                message: req.body.isPinned
                    ? 'Đã ghim bài viết'
                    : 'Đã gỡ ghim bài viết',
                data: news,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}

module.exports = new NewsController();
