const softwareInfoController = require('../controllers/SoftwareInfoController');

class softwareInfoMiddleware {
    index = (req, res, next) => {
        softwareInfoController.index(req, res, next);
    };
}

module.exports = new softwareInfoMiddleware();
