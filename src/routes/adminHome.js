const express = require('express');
const router = express.Router();
const siteMiddleware = require('../app/middlewares/SiteMiddleWare');

// Admin dashboard
router.get('/', siteMiddleware.renderAdminPage);

// Technician Management
router.get('/ky-thuat-vien', siteMiddleware.getAdminTechniciansList);
router.put('/ky-thuat-vien/:id/role', siteMiddleware.updateTechnicianRole);
router.put('/ky-thuat-vien/:id/status', siteMiddleware.updateTechnicianStatus);

module.exports = router;
