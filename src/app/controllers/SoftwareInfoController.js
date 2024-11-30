class SoftwareInfoController {
    index = (req, res, next) => {
        res.render('softwareInfo');
    };
}

module.exports = new SoftwareInfoController();
