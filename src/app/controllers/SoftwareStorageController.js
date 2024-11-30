const softwareService = require('../services/SoftwareStorageService');

class SoftwareStorageController {
    index(req, res) {
        res.render('softwareStorage', { currentUser: req.user });
    }
    async getAll(req, res) {
        try {
            const software = await softwareService.getAllSoftware();
            res.json({ success: true, data: software });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async create(req, res) {
        try {
            const software = await softwareService.createSoftware(
                req.body,
                req.user.mssv,
            );
            res.json({ success: true, data: software });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async update(req, res) {
        try {
            const software = await softwareService.updateSoftware(
                req.params.id,
                req.body,
                req.user.mssv,
            );
            res.json({ success: true, data: software });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async delete(req, res) {
        try {
            await softwareService.deleteSoftware(
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

module.exports = new SoftwareStorageController();
