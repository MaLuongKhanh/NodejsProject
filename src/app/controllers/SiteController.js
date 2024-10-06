const siteService = require('../services/SiteServices');
const mongoose = require('../../utils/mongoose');

class SiteController {
    index = (req, res, next) => {
        // res.json({
        //     'status': 200,
        // })
        let arr = siteService.index();
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i]);
        }
        res.render('home', { arr });
    };
}

module.exports = new SiteController();
