const mongoose = require('mongoose');
const User = require('./User');
const Book = require('./Book');
const Chapter = require('./Chapter');

const Schema = mongoose.Schema;
const UserLikeStatus = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: Book },
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: Chapter },
    isLike: { type: Boolean, default: false },
    readDate: { type: Date },
});

UserLikeStatus.pre('save', function (next) {
    if (this.isLike && !this.readDate) {
        this.readDate = new Date();
    } else if (!this.isLike) {
        this.readDate = null;
    }
    next();
});

module.exports = mongoose.Mongoose.model('UserLikeStatus', UserLikeStatus);
