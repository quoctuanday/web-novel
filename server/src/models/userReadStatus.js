const mongoose = require('mongoose');
const User = require('./User');
const Book = require('./Book');
const Chapter = require('./Chapter');

const Schema = mongoose.Schema;
const UserReadStatus = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: Book },
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: Chapter },
    isRead: { type: Boolean, default: false },
    readDate: { type: Date },
});

UserReadStatus.pre('save', function (next) {
    if (this.isRead && !this.readDate) {
        this.readDate = new Date();
    } else if (!this.isRead) {
        this.readDate = null;
    }
    next();
});

module.exports = mongoose.Mongoose.model('UserReadStatus', UserReadStatus);
