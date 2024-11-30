const express = require('express');
const router = express.Router();
const changePasswordMiddleware = require('../app/middlewares/ChangePasswordMiddleware');

router.get('/', changePasswordMiddleware.index);
router.put('/update', changePasswordMiddleware.update);

module.exports = router;
