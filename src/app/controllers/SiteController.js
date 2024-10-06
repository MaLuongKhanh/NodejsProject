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
        res.render('home', {
            title: 'My Home Page',
            style: 'style.css',
            body: '<h1>Welcome to my site!</h1>',
            header: '<h2>My Header</h2>',
            footer: '<footer.hbs>My Footer</footer.hbs>',
        });
    };
}

module.exports = new SiteController();
