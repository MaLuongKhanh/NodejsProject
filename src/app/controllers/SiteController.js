const siteService = require('../services/SiteService');
const NewsService = require('../services/NewsService');

class SiteController {
    async renderHomePage(req, res) {
        try {
            const news = await NewsService.getAllNews();
            res.render('home', { news });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy tin tức',
            });
        }
    }

    async getDashboardStats(req, res) {
        try {
            const stats = await siteService.getDashboardStats();
            res.json({
                success: true,
                data: stats,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy thống kê dashboard',
            });
        }
    }

    async getTechniciansList(req, res) {
        try {
            const technicians = await siteService.getTechniciansList();
            res.json({
                success: true,
                data: technicians,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy danh sách kỹ thuật viên',
            });
        }
    }

    async createSupportRequest(req, res) {
        try {
            const request = await siteService.createSupportRequest(req.body);
            res.status(201).json({
                success: true,
                message: 'Tạo yêu cầu hỗ trợ thành công',
                data: request,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getTodoList(req, res) {
        try {
            const todos = await siteService.getTodoList(req.user.mssv);
            res.json({ success: true, data: todos });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy danh sách công việc',
            });
        }
    }

    async createTodo(req, res) {
        try {
            const todo = await siteService.createTodo(
                req.user.mssv,
                req.body.content,
            );
            res.status(201).json({
                success: true,
                message: 'Thêm công việc thành công',
                data: todo,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async toggleTodo(req, res) {
        try {
            const todo = await siteService.toggleTodo(
                req.params.id,
                req.user.mssv,
            );
            res.json({
                success: true,
                message: 'Cập nhật trạng thái thành công',
                data: todo,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async deleteTodo(req, res) {
        try {
            await siteService.deleteTodo(req.params.id, req.user.mssv);
            res.json({
                success: true,
                message: 'Xóa công việc thành công',
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getAdminTechniciansList(req, res) {
        try {
            const technicians = await siteService.getAdminTechniciansList();
            res.json({
                success: true,
                data: technicians,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy danh sách kỹ thuật viên',
            });
        }
    }

    async updateTechnicianRole(req, res) {
        try {
            await siteService.updateTechnicianRole(
                req.params.id,
                req.body.role,
            );
            res.json({
                success: true,
                message: 'Cập nhật quyền thành công',
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async updateTechnicianStatus(req, res) {
        try {
            console.log('Bankai', req.params.id, req.body);
            await siteService.updateTechnicianStatus(
                req.params.id,
                req.body.hide,
            );
            res.json({
                success: true,
                message: 'Cập nhật trạng thái thành công',
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async renderAdminPage(req, res) {
        try {
            const news = await NewsService.getAllNews();
            res.render('admin_home', { news });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy tin tức',
            });
        }
    }

    async getUserDetail(req, res) {
        try {
            const user = await siteService.getUserDetail(req.params.id);
            res.json({
                success: true,
                data: user,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}

module.exports = new SiteController();
