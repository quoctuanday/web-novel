const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Book = new Schema(
    {
        title: { type: String, maxLength: 255, required: true },
        author: { type: String, maxLength: 255, required: true },
        description: { type: String, required: true },
        image: { type: String, maxLength: 255 },
        numberOfChapter: { type: Number, default: 0 },
        type: { type: [String], required: true },
    },
    { timestamps: true }
);

Book.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('Book', Book);
