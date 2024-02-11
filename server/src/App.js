// App.js

// Environnement variables
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import userRouter from './routes/UserRouter.js';
import topicRouter from './routes/TopicRouter.js';
import messageRouter from './routes/MessageRouter.js';

const app = express();
const port = process.env.PORT;

/* Middlewares */

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

// Helmet
app.use(helmet());

// Rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use(limiter);

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/topic', topicRouter);
app.use('/api/message', messageRouter);

app.get('/api/status', (req, res) => {
    res.send({
        message: "Server is OK!"
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});