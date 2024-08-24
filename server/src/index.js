const path = require('path');
const express = require('express');
const cors = require('cors');
const { PORT, CLIENT_PORT } = require('./config/env');
const db = require('./config/db');
const route = require('./routes');
const session = require('express-session');

const app = express();
db.connect();

app.use(
    cors({
        origin: `http://localhost:${CLIENT_PORT}`,
        credentials: true,
    })
);

app.use(
    session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 3600000,
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
        },
    })
);

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

route(app);
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
