class AboutUsController {
    index = (req, res, next) => {
        res.render('aboutUs');
    };
}

module.exports = new AboutUsController();
