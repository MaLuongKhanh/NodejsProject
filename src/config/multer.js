const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isNewsRoute = req.originalUrl.includes('/tin-tuc');
        const uploadPath = isNewsRoute
            ? 'src/public/uploads/news'
            : 'src/public/uploads/avatars';
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const prefix = req.originalUrl.includes('/tin-tuc')
            ? 'news-'
            : 'avatar-';
        cb(null, prefix + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase(),
        );

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Chỉ chấp nhận file ảnh (jpg, jpeg, png)'));
    },
});

module.exports = upload;
