const { multipleMongooseToObject } = require('../utils/mongoose');
const { mongooseToObject } = require('../utils/mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

class AuthController {
    register(req, res, next) {
        const formData = req.body;
        const { password } = formData;
        bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
                formData.password = hashedPassword;
                const user = new User(formData);
                return user.save();
            })
            .then(() => {
                res.send('Đăng ký thành công');
            })
            .catch((err) => {
                console.error('Lỗi khi đăng ký', err);
                next(err);
            });
    }

    login(req, res, next) {
        const { userName, password } = req.body;

        console.log('Login attempt with userName:', userName);

        User.findOne({ userName })
            .exec()
            .then((user) => {
                if (!user) {
                    console.log('User not found');
                    return res.status(401).json({ message: 'Unauthorized' });
                }

                console.log('User found:', user.userName);
                console.log('userID: ', user._id);

                return bcrypt.compare(password, user.password).then((match) => {
                    if (!match) {
                        console.log('Password does not match');
                        return res
                            .status(401)
                            .json({ message: 'Unauthorized' });
                    }

                    req.session.userId = user._id;
                    console.log(req.session.userId);
                    res.json(user);
                });
            })
            .catch((error) => {
                console.error('Error during login:', error);
                next(error);
            });
    }

    logOut(req, res, next) {
        const destroySessionPromise = new Promise((resolve, reject) => {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error destroying session:', err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        destroySessionPromise
            .then(() => {
                res.send('Logged out successfully');
            })
            .catch((error) => {
                console.error('Error logging out:', error);
                res.status(500).send('Error logging out');
            });
    }
}

module.exports = new AuthController();
