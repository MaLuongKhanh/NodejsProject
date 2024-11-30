const landingPageController = require('../controllers/LandingPageController');

class LandingPageMiddleware {
    index = async (req, res, next) => {
        landingPageController.index(req, res, next);
    };
}
module.exports = new LandingPageMiddleware();
