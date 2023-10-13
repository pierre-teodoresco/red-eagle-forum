// App.js

// Environnement variables
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import userController from './controllers/UserController.js';

const app = express();
const port = process.env.PORT;

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

// Routes
app.post('/user', userController.addUser);

app.get('/status', (req, res) => {
    res.send({
        message: "Server is OK!"
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});