const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema(
    {
        tenmenu: { type: String, required: true },
        link: String,
        meta: String,
        hide: Boolean,
        order: Number,
        datebegin: { type: Date, default: Date.now },
        icon: String,
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Menu', MenuSchema);
