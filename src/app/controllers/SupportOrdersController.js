const supportOrdersService = require('../services/SupportOrdersService');

class SupportOrdersController {
    async index(req, res) {
        try {
            res.render('supportOrders', {
                currentUser: {
                    mssv: req.user.mssv,
                    role: req.user.role,
                },
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await supportOrdersService.getAllOrders();
            res.json({ success: true, data: orders });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateStatus(req, res) {
        try {
            const result = await supportOrdersService.updateStatus(
                req.params.id,
                req.body.status,
                req.user.mssv,
            );
            res.json({
                success: true,
                data: result.data,
                message: result.message,
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async updateOrder(req, res) {
        try {
            const result = await supportOrdersService.updateOrder(
                req.params.id,
                req.body,
                req.user.mssv,
            );
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async deleteOrder(req, res) {
        try {
            await supportOrdersService.deleteOrder(
                req.params.id,
                req.user.mssv,
                req.user.role,
            );
            res.json({ success: true, message: 'Xóa thành công' });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}

module.exports = new SupportOrdersController();
