const { body, validationResult } = require('express-validator');
const upload = require('../../config/multer');
const newsController = require('../controllers/NewsController');

class NewsMiddleware {
    validateNews = [
        body('title')
            .trim()
            .notEmpty()
            .withMessage('Tiêu đề không được để trống')
            .isLength({ max: 200 })
            .withMessage('Tiêu đề không quá 200 ký tự'),
        body('content')
            .trim()
            .notEmpty()
            .withMessage('Nội dung không được để trống'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: errors.array()[0].msg,
                    errors: errors.array(),
                });
            }
            next();
        },
    ];

    uploadImage = upload.single('image');

    handleUpload = (req, res, next) => {
        if (req.file) {
            req.body.image = '/uploads/news/' + req.file.filename;
        }
        next();
    };

    index = (req, res, next) => {
        newsController.index(req, res, next);
    };

    getAllNews = (req, res, next) => {
        newsController.getAllNews(req, res, next);
    };

    getAllNewsWithHidden = (req, res, next) => {
        newsController.getAllNewsWithHidden(req, res, next);
    };

    getNewsById = (req, res, next) => {
        newsController.getNewsById(req, res, next);
    };

    createNews = (req, res, next) => {
        newsController.createNews(req, res, next);
    };

    updateNews = (req, res, next) => {
        newsController.updateNews(req, res, next);
    };

    deleteNews = (req, res, next) => {
        newsController.deleteNews(req, res, next);
    };

    restoreNews = (req, res, next) => {
        newsController.restoreNews(req, res, next);
    };
    togglePin = (req, res, next) => {
        newsController.togglePin(req, res, next);
    };
}

module.exports = new NewsMiddleware();
