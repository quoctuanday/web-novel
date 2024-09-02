const { multipleMongooseToObject } = require('../utils/mongoose');
const { mongooseToObject } = require('../utils/mongoose');
const Book = require('../models/Book');
const Chapter = require('../models/Chapter');

class NovelController {
    addStory(req, res, next) {
        const formData = req.body.updatedFormData;
        const book = new Book(formData);
        book.save()
            .then(() => {
                console.log('Book saved successfully');
                return res.status(200).send('Book saved successfully');
            })
            .catch((error) => {
                console.error('Book saved error:', error);
                next(error);
            });
    }
    showStory(req, res, next) {
        const author = req.params.userName;
        Book.find({ author: author })
            .then((book) => {
                if (!book) return res.json('book not found');
                res.status(200).json({ book: multipleMongooseToObject(book) });
            })
            .catch((error) => {
                console.error('Book show error:', error);
                next(error);
            });
    }
    showStoryDetail(req, res, next) {
        const bookId = req.params.bookId;
        Book.findById(bookId)
            .then((book) => {
                if (!book) return res.json('book not found');
                res.status(200).json({ book: mongooseToObject(book) });
            })
            .catch((error) => {
                console.error('Book show error:', error);
                next(error);
            });
    }

    async postChapter(req, res, next) {
        try {
            const formData = req.body.formData;
            const bookId = req.params.bookId;
            formData.bookId = bookId;

            const chapter = new Chapter(formData);
            await chapter.save();

            const result = await Book.updateOne(
                { _id: bookId },
                { $set: { numberOfChapter: formData.chapterNumber } }
            );

            console.log('Book updated successfully');
            console.log('Chapter saved successfully');
            return res.status(200).send('Chapter saved successfully');
        } catch (error) {
            console.error('Error:', error);
            next(error);
        }
    }
}

module.exports = new NovelController();
