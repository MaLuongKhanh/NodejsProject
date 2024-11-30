const express = require('express');
const router = express.Router();
const aboutUsMiddleWare = require('../app/middlewares/AboutUsMiddleware');

router.get('/', aboutUsMiddleWare.index);

module.exports = router;
