const express = require('express');
const router = express.Router();
const landingPageMiddleWare = require('../app/middlewares/LandingPageMiddleWare');
const siteMiddleware = require('../app/middlewares/SiteMiddleWare');

router.get('/', landingPageMiddleWare.index);
router.post('/yeu-cau-ho-tro', siteMiddleware.createSupportRequest);

module.exports = router;
