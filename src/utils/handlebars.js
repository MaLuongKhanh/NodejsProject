const { engine } = require('express-handlebars');

function templatesEngine(app) {
    app.engine(
        'hbs',
        engine({
            extname: '.hbs',
            helpers: {
                sum(a, b) {
                    return a + b;
                },

                minus(a, b) {
                    return a - b;
                },

                equal(a, b) {
                    return a === b;
                },

                lessThan(a, b) {
                    return a < b;
                },

                lessOrEqualThan(a, b) {
                    return a <= b;
                },

                moreThan(a, b) {
                    return a > b;
                },

                moreOrEqualThan(a, b) {
                    return a >= b;
                },

                getArrayLength(array) {
                    return array.length;
                },

                convertDate(date) {
                    const [year, month, day] = date.split('-');
                    return `${day}-${month}-${year}`;
                },
                convertDateTime(dateTime) {
                    const date = new Date(dateTime);
                    return date.toISOString().split('T')[0]; // YYYY-MM-DD
                },
                convertDateTimeVersion2(dateTime) {
                    const date = new Date(dateTime);

                    const day = String(date.getUTCDate()).padStart(2, '0');
                    const month = String(date.getUTCMonth() + 1).padStart(
                        2,
                        '0',
                    ); // Tháng bắt đầu từ 0
                    const year = date.getUTCFullYear();

                    const hours = String(date.getUTCHours()).padStart(2, '0');
                    const minutes = String(date.getUTCMinutes()).padStart(
                        2,
                        '0',
                    );
                    const seconds = String(date.getUTCSeconds()).padStart(
                        2,
                        '0',
                    );

                    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
                },
                objectToJson: function (context) {
                    return JSON.stringify(context, null, 2);
                },
                isRole(userRole, ...roles) {
                    const validRoles = roles.slice(0, -1);
                    return validRoles.includes(userRole);
                },
                hasAnyRole(userRole, ...allowedRoles) {
                    const roles = allowedRoles.slice(0, -1);
                    return roles.some((role) => {
                        switch (role) {
                            case 'admin':
                                return userRole === 'admin';
                            case 'lead':
                                return ['admin', 'lead'].includes(userRole);
                            case 'member':
                                return ['admin', 'lead', 'member'].includes(
                                    userRole,
                                );
                            case 'customer':
                                return [
                                    'admin',
                                    'lead',
                                    'member',
                                    'customer',
                                ].includes(userRole);
                            default:
                                return false;
                        }
                    });
                },
                getShiftTime(catruc) {
                    const shiftTimes = {
                        1: '7:30 - 9:30',
                        2: '9:30 - 11:30',
                        3: '13:30 - 15:30',
                        4: '15:30 - 17:00',
                    };
                    return shiftTimes[catruc] || '';
                },
                isRegistered(scheduleData, catruc, mssv) {
                    if (!scheduleData || !scheduleData[catruc]) return false;
                    return scheduleData[catruc].some(
                        (schedule) => schedule.mssv === mssv,
                    );
                },
                getRegisteredUsers(scheduleData, catruc) {
                    if (!scheduleData || !scheduleData[catruc]) return [];
                    return scheduleData[catruc].map(
                        (schedule) => schedule.mssv,
                    );
                },
                countRegistered(scheduleData, catruc) {
                    if (!scheduleData || !scheduleData[catruc]) return 0;
                    return scheduleData[catruc].length;
                },
                isShiftFull(scheduleData, catruc) {
                    if (!scheduleData || !scheduleData[catruc]) return false;
                    return scheduleData[catruc].length >= 6;
                },
                json(context) {
                    return JSON.stringify(context);
                },
                limit(arr, limit) {
                    if (!Array.isArray(arr)) return [];
                    return arr.slice(0, limit);
                },
                formatDate(date, format) {
                    const d = new Date(date);
                    const day = String(d.getDate()).padStart(2, '0');
                    const month = String(d.getMonth() + 1).padStart(2, '0');
                    const year = d.getFullYear();
                    return `${day}/${month}/${year}`;
                },
            },
        }),
    );
}

module.exports = templatesEngine;
