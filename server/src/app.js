// app.js

// Environnement variables
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'

const app = express();
const port = process.env.PORT;

app.get('/status', (req, res) => {
    res.send({
        message: "Server is OK!"
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});