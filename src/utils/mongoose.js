module.exports = {
    // list
    multipleMongooseToObj: function (mongoosesArrays) {
        return mongoosesArrays.map((mongooseObj) =>
            mongooseObj && mongooseObj.toObject
                ? mongooseObj.toObject()
                : mongooseObj,
        );
    },

    // only 1
    mongooseToObj: function (mongooseOne) {
        return mongooseOne ? mongooseOne.toObject() : mongooseOne;
    },
};
