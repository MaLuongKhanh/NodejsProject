class LandingPageController {
    index = (req, res, next) => {
        res.render('landingPage', { layout: false });
    };
}

module.exports = new LandingPageController();
