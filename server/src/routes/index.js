const userRouter = require('./user');
const authRouter = require('./auth');
const novelRouter = require('./novel');

function route(app) {
    app.use('/novel', novelRouter);
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
}
module.exports = route;
