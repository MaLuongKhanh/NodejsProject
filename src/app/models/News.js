const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        image: String,
        hide: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    },
);
NewsSchema.index({ title: 'text', content: 'text' });
NewsSchema.index({ order: -1, hide: 1 });
module.exports = mongoose.model('News', NewsSchema);
