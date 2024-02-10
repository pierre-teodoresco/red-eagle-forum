// App.js

// Environnement variables
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import session from 'express-session';

import userRouter from './routes/UserRouter.js';
import topicRouter from './routes/TopicRouter.js';
import messageRouter from './routes/MessageRouter.js';

const app = express();
const port = process.env.PORT;

// Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    }
}));

// Body parser
app.use(express.json());

// CORS
app.use(cors({ origin: process.env.FRONT_URL })); // Only accept requests from the front-end

/* Routes */
app.use('/user', userRouter);
app.use('/topic', topicRouter);
app.use('/message', messageRouter);

/* Middlewares */

app.get('/status', (req, res) => {
    res.send({
        message: "Server is OK!"
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});