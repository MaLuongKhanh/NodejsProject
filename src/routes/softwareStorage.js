const express = require('express');
const router = express.Router();
const softwareMiddleware = require('../app/middlewares/SoftwareStorageMiddleware');

router.get('/', softwareMiddleware.index);
router.get('/danh-sach', softwareMiddleware.getAll);
router.post('/', softwareMiddleware.create);
router.put('/:id', softwareMiddleware.update);
router.delete('/:id', softwareMiddleware.delete);

module.exports = router;
