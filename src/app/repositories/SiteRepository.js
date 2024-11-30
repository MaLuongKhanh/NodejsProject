const User = require('../models/User');
const SupportHistory = require('../models/SupportHistory');
const Todo = require('../models/Todo');

class SiteRepository {
    async getTotalTechnicians() {
        return await User.countDocuments({
            role: { $in: ['member', 'lead', 'admin'] },
            hide: false,
        });
    }

    async getTodayRequests() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return await SupportHistory.countDocuments({
            ngaygui: { $gte: today },
            hide: false,
        });
    }

    async getFixedDevices() {
        return await SupportHistory.countDocuments({
            trangthai: 'bàn giao máy',
            hide: false,
        });
    }

    async getTechniciansList() {
        return await User.find(
            {
                role: { $in: ['member', 'lead', 'admin'] },
                hide: false,
            },
            'hoten mssv avatar trangthai',
        );
    }

    async createSupportRequest(requestData) {
        const support = new SupportHistory({
            ...requestData,
            trangthai: 'chờ',
            hide: false,
        });
        return await support.save();
    }

    async getTodoList(mssv) {
        return await Todo.find({ mssv }).sort({ createAt: -1 });
    }

    async createTodo(mssv, content) {
        const todo = new Todo({
            content,
            mssv,
            isCompleted: false,
        });
        return await todo.save();
    }

    async toggleTodo(todoId, mssv) {
        const todo = await Todo.findOne({ _id: todoId, mssv });
        if (!todo) throw new Error('Todo không tồn tại');
        todo.isCompleted = !todo.isCompleted;
        return await todo.save();
    }

    async deleteTodo(todoId, mssv) {
        const result = await Todo.deleteOne({ _id: todoId, mssv });
        if (result.deletedCount === 0) throw new Error('Todo không tồn tại');
        return result;
    }

    async getAdminTechniciansList() {
        return await User.find(
            { role: { $in: ['customer', 'member', 'lead', 'admin'] } },
            'hoten mssv avatar role hide',
        );
    }

    async updateTechnicianRole(id, role) {
        const user = await User.findById(id);
        if (!user) throw new Error('Không tìm thấy người dùng');
        user.role = role;
        return await user.save();
    }

    async updateTechnicianStatus(id, hide) {
        const user = await User.findById(id);
        if (!user) throw new Error('Không tìm thấy người dùng');
        user.hide = hide;
        return await user.save();
    }

    async getUserDetail(id) {
        return await User.findById(id);
    }
}

module.exports = new SiteRepository();
