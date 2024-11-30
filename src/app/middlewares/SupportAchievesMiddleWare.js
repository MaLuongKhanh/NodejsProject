const supportAchievesController = require('../controllers/SupportAchievesController.js');

class supportAchievesMiddleWare {
    index = (req, res) => {
        supportAchievesController.index(req, res);
    };
    getTopSupportTechnicians = (req, res) => {
        supportAchievesController.getTopSupportTechnicians(req, res);
    };
    getTopAttendanceTechnicians = (req, res) => {
        supportAchievesController.getTopAttendanceTechnicians(req, res);
    };
}

module.exports = new supportAchievesMiddleWare();
