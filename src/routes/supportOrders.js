const express = require('express');
const router = express.Router();
const supportOrdersMiddleware = require('../app/middlewares/SupportOrdersMiddleWare');

router.get('/', supportOrdersMiddleware.index);

router.get('/danh-sach', supportOrdersMiddleware.getAllOrders);

router.put('/trang-thai/:id', supportOrdersMiddleware.updateStatus);

router.put('/:id', supportOrdersMiddleware.updateOrder);

router.delete('/:id', supportOrdersMiddleware.deleteOrder);

module.exports = router;
