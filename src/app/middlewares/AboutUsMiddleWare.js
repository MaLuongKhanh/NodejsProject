const aboutUsController = require('../controllers/AboutUsController');

class aboutUsMiddleware {
    index = (req, res, next) => {
        aboutUsController.index(req, res, next);
    };
}

module.exports = new aboutUsMiddleware();
