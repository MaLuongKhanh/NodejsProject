const siteRepository = require('../repositories/SiteRepository');

class SiteService {
    async getDashboardStats() {
        const [totalTechnicians, todayRequests, fixedDevices] =
            await Promise.all([
                siteRepository.getTotalTechnicians(),
                siteRepository.getTodayRequests(),
                siteRepository.getFixedDevices(),
            ]);

        return {
            totalTechnicians,
            todayRequests,
            fixedDevices,
        };
    }

    async getTechniciansList() {
        const technicians = await siteRepository.getTechniciansList();
        return technicians.map((tech) => ({
            avatar: tech.avatar || '/uploads/avatars/default-avatar.jpg',
            fullName: tech.hoten,
            studentId: tech.mssv,
            status: tech.hide ? 'Không hoạt động' : 'Đang hoạt động',
            statusClass: tech.hide ? 'text-danger' : 'text-success',
        }));
    }

    async getAdminTechniciansList() {
        const technicians = await siteRepository.getAdminTechniciansList();
        return technicians.map((tech) => ({
            id: tech._id,
            avatar: tech.avatar || '/uploads/avatars/default-avatar.jpg',
            fullName: tech.hoten,
            studentId: tech.mssv,
            role: tech.role,
            status: tech.hide ? 'Không hoạt động' : 'Đang hoạt động',
            statusClass: tech.hide ? 'text-danger' : 'text-success',
            hide: tech.hide,
        }));
    }

    async updateTechnicianRole(id, role) {
        return await siteRepository.updateTechnicianRole(id, role);
    }

    async updateTechnicianStatus(id, hide) {
        return await siteRepository.updateTechnicianStatus(id, hide);
    }

    async createSupportRequest(requestData) {
        const supportRequest = {
            hoten: requestData.studentName,
            maKH: requestData.studentId,
            email: requestData.studentEmail,
            sdt: requestData.studentPhone,
            tenmay: requestData.studentDevice,
            matkhau: requestData.devicePassword,
            loaihotro: requestData.requestContent,
            ngaygui: requestData.dateSend,
        };

        return await siteRepository.createSupportRequest(supportRequest);
    }

    async getTodoList(mssv) {
        const todos = await siteRepository.getTodoList(mssv);
        return todos.map((todo) => ({
            _id: todo._id,
            content: todo.content,
            isCompleted: todo.isCompleted,
        }));
    }

    async createTodo(mssv, content) {
        return await siteRepository.createTodo(mssv, content);
    }

    async toggleTodo(todoId, mssv) {
        return await siteRepository.toggleTodo(todoId, mssv);
    }

    async deleteTodo(todoId, mssv) {
        return await siteRepository.deleteTodo(todoId, mssv);
    }

    async getUserDetail(id) {
        return await siteRepository.getUserDetail(id);
    }
}

module.exports = new SiteService();
