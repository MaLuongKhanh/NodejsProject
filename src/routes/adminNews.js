const express = require('express');
const router = express.Router();
const newsMiddleware = require('../app/middlewares/NewsMiddleware');
const roleMiddleware = require('../app/middlewares/RoleMiddleware');

// Render trang quản lý tin tức
router.get('/', roleMiddleware.isAdmin, newsMiddleware.index);

// API endpoints
router.get(
    '/list',
    roleMiddleware.isAdmin,
    newsMiddleware.getAllNewsWithHidden,
);
router.get('/all', roleMiddleware.isMember, newsMiddleware.getAllNews);
router.get('/:id', roleMiddleware.isMember, newsMiddleware.getNewsById);

// Sửa lại thứ tự middleware cho route POST
router.post(
    '/',
    roleMiddleware.isAdmin,
    newsMiddleware.uploadImage,
    newsMiddleware.handleUpload,
    newsMiddleware.validateNews,
    newsMiddleware.createNews,
);

// Sửa lại thứ tự middleware cho route PUT
router.put(
    '/:id',
    roleMiddleware.isAdmin,
    newsMiddleware.uploadImage,
    newsMiddleware.handleUpload,
    newsMiddleware.validateNews,
    newsMiddleware.updateNews,
);

router.delete('/:id', roleMiddleware.isAdmin, newsMiddleware.deleteNews);
router.patch(
    '/:id/restore',
    roleMiddleware.isAdmin,
    newsMiddleware.restoreNews,
);
router.patch('/:id/pin', roleMiddleware.isAdmin, newsMiddleware.togglePin);

module.exports = router;
