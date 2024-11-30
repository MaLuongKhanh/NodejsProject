const express = require('express');
const router = express.Router();
const landingPageMiddleWare = require('../app/middlewares/LandingPageMiddleware');

router.get('/', landingPageMiddleWare.index);

module.exports = router;
