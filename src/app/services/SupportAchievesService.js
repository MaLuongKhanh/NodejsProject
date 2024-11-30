const SupportAchievesRepository = require('../repositories/SupportAchievesRepository');

class SupportAchievesServices {
    async getTopSupportTechnicians() {
        return await SupportAchievesRepository.getTopSupportTechnicians();
    }
    async getTopAttendanceTechnicians() {
        return await SupportAchievesRepository.getTopAttendanceTechnicians();
    }
}

module.exports = new SupportAchievesServices();
