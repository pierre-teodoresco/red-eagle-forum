// App.js

// Environnement variables
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
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

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

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