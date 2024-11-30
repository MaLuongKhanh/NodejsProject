const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SoftwareStorageSchema = new Schema(
    {
        ten: { type: String, required: true },
        mota: String,
        link: { type: String, required: true },
        mssv: {
            type: String,
            ref: 'User',
            required: true,
        },
        ngaydang: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('SoftwareStorage', SoftwareStorageSchema);
