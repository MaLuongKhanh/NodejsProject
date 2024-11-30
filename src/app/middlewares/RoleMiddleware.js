class RoleMiddleware {
    checkRole = (...roles) => {
        return (req, res, next) => {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized - Vui lòng đăng nhập',
                });
            }

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden - Bạn không có quyền truy cập',
                });
            }

            next();
        };
    };

    isAdmin = (req, res, next) => {
        return this.checkRole('admin')(req, res, next);
    };

    isLead = (req, res, next) => {
        return this.checkRole('admin', 'lead')(req, res, next);
    };

    isMember = (req, res, next) => {
        return this.checkRole('admin', 'lead', 'member')(req, res, next);
    };
    isCustomer = (req, res, next) => {
        return this.checkRole(
            'admin',
            'lead',
            'member',
            'customer',
        )(req, res, next);
    };
}

module.exports = new RoleMiddleware();
