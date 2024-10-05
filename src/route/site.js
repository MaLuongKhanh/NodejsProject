const express = require('express');
const router = express.Router();
const siteMiddleWare = require('../app/middlewares/SiteMiddleWare');

router.get('/', siteMiddleWare.index);

module.exports = router;
