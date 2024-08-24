const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Book = require('./Book');

const Schema = mongoose.Schema;

const Chapter = new Schema(
    {
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: Book },
        title: { type: String, required: true },
        chapterNumber: { type: String, required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

Chapter.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('Chapter', Chapter);
