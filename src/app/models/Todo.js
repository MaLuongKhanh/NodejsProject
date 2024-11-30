const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
    {
        content: { type: String, required: true },
        isCompleted: { type: Boolean, default: false },
        mssv: {
            type: String,
            ref: 'User',
            required: true,
        },
        createAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Todo', TodoSchema);
