const { multipleMongooseToObject } = require('../utils/mongoose');
const { mongooseToObject } = require('../utils/mongoose');
const Book = require('../models/Book');

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
}

module.exports = new NovelController();
