const { body, validationResult } = require('express-validator');
const softwareController = require('../controllers/SoftwareStorageController');

class SoftwareStorageMiddleware {
    validateSoftware = [
        body('ten')
            .trim()
            .notEmpty()
            .withMessage('Tên phần mềm không được để trống'),
        body('link')
            .trim()
            .notEmpty()
            .withMessage('Link không được để trống')
            .isURL()
            .withMessage('Link không hợp lệ'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }
            next();
        },
    ];
    index = (req, res, next) => {
        softwareController.index(req, res, next);
    };
    getAll = (req, res, next) => {
        softwareController.getAll(req, res, next);
    };
    create = (req, res, next) => {
        this.validateSoftware;
        softwareController.create(req, res, next);
    };
    update = (req, res, next) => {
        this.validateSoftware;
        softwareController.update(req, res, next);
    };
    delete = (req, res, next) => {
        softwareController.delete(req, res, next);
    };
}

module.exports = new SoftwareStorageMiddleware();
