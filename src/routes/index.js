const siteRouter = require('./site');
const aboutUsRouter = require('./aboutUs');
const softwareInfoRouter = require('./softwareInfo');
const profileRouter = require('./profile');
const scheduleRegisterRouter = require('./scheduleRegister');
const attendanceRouter = require('./attendance');
const supportAchievesRouter = require('./supportAchieves');
const supportOrdersRouter = require('./supportOrders');
const softwareStorageRouter = require('./softwareStorage');
const authRouter = require('./auth');
const loginRouter = require('./login');
const registerRouter = require('./register');
const logoutRouter = require('./logout');
const landingPageRouter = require('./landingPage');
const forgotPasswordRouter = require('./forgotPassword');
const authMiddleware = require('../app/middlewares/AuthMiddleWare');
const roleMiddleware = require('../app/middlewares/RoleMiddleware');
const changePasswordRouter = require('./changePassword');
const adminHomeRouter = require('./adminHome');
const adminNewsRouter = require('./adminNews');

function route(app) {
    // Public routes
    app.use('/dang-nhap', loginRouter);
    app.use('/dang-ky', registerRouter);
    app.use('/dang-xuat', logoutRouter);
    app.use('/quen-mat-khau', forgotPasswordRouter);
    app.use('/auth', authRouter);
    app.use('/', landingPageRouter);

    // Protected routes
    app.use(
        '/trang-chu',
        authMiddleware.verifyToken,
        roleMiddleware.isMember,
        siteRouter,
    );
    app.use(
        '/ve-chung-toi',
        authMiddleware.verifyToken,
        roleMiddleware.isMember,
        aboutUsRouter,
    );
    app.use(
        '/ve-trang-web',
        authMiddleware.verifyToken,
        roleMiddleware.isMember,
        softwareInfoRouter,
    );
    app.use(
        '/quan-li-trang-ca-nhan',
        authMiddleware.verifyToken,
        roleMiddleware.isMember,
        profileRouter,
    );
    app.use(
        '/dang-ky-ca-truc',
        authMiddleware.verifyToken,
        roleMiddleware.isMember,
        scheduleRegisterRouter,
    );
    app.use(
        '/diem-danh-ca-truc',
        authMiddleware.verifyToken,
        roleMiddleware.isLead,
        attendanceRouter,
    );
    app.use(
        '/thanh-tich',
        authMiddleware.verifyToken,
        roleMiddleware.isMember,
        supportAchievesRouter,
    );
    app.use(
        '/tiep-nhan-ho-tro',
        authMiddleware.verifyToken,
        roleMiddleware.isMember,
        supportOrdersRouter,
    );
    app.use(
        '/kho-phan-mem',
        authMiddleware.verifyToken,
        roleMiddleware.isLead,
        softwareStorageRouter,
    );

    app.use('/doi-mat-khau', authMiddleware.verifyToken, changePasswordRouter);

    // Admin routes
    app.use('/admin/tin-tuc', authMiddleware.verifyToken, adminNewsRouter);

    app.use(
        '/admin',
        authMiddleware.verifyToken,
        roleMiddleware.isAdmin,
        adminHomeRouter,
    );

    // Error handling routes
    app.use((req, res) => {
        res.status(404).render('404', { layout: false });
    });

    app.use((err, req, res, next) => {
        console.error('Server Error:', err.stack);
        res.status(500).render('500', {
            layout: false,
        });
    });
}

module.exports = route;
