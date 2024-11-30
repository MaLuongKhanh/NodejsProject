const express = require('express');
const router = express.Router();
const siteMiddleware = require('../app/middlewares/SiteMiddleWare');

// Pages
router.get('/', siteMiddleware.index);

// Dashboard APIs
router.get('/thong-ke', siteMiddleware.getDashboardStats);
router.get('/ky-thuat-vien', siteMiddleware.getTechniciansList);
router.post('/yeu-cau-ho-tro', siteMiddleware.createSupportRequest);
router.get('/ky-thuat-vien/:id', siteMiddleware.getUserDetail);
// Todo APIs
router.get('/todos', siteMiddleware.getTodoList);
router.post('/todos', siteMiddleware.createTodo);
router.put('/todos/:id/toggle', siteMiddleware.toggleTodo);
router.delete('/todos/:id', siteMiddleware.deleteTodo);

module.exports = router;
