// App.js

// Environnement variables
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userController from './controllers/UserController.js';

const app = express();
const port = process.env.PORT;

// Body parser
app.use(express.json());
app.use(cors({ origin: process.env.FRONT_URI })); // Autorisez uniquement les requêtes depuis ce domaine

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

// User
app.post('/api/user', userController.register);
app.get('/api/user', userController.login);

app.get('/status', (req, res) => {
    res.send({
        message: "Server is OK!"
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});