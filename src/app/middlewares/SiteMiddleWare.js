const siteController = require('../controllers/SiteController');

class SiteMiddleWare {
    index = (req, res, next) => {
        siteController.index(req, res, next);
    };
}

module.exports = new SiteMiddleWare();
