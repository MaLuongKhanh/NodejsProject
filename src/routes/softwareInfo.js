const express = require('express');
const router = express.Router();
const softwareInfoMiddleWare = require('../app/middlewares/SoftwareInfoMiddleWare');

router.get('/', softwareInfoMiddleWare.index);

module.exports = router;
