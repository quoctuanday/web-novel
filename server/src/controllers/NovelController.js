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
}

module.exports = new NovelController();
